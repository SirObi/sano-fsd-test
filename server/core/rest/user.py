# API for user authenticated endpoints
# Note: none of these endpoints should have a user_id or user_email parameter passed in via the request.
# the user_id and user_email is obtained from the JWT, if valid
import io
import json
import logging
from datetime import datetime as dt

import numpy as np
import pytz
import shortuuid
from flask import Blueprint
from flask import current_app as app
from flask import jsonify, request
from peewee import IntegrityError
from playhouse.shortcuts import model_to_dict

from core.auth.decorators import user_only

from core.models import Enrollments


tz = pytz.timezone("Europe/London")
user_api = Blueprint("user_api", __name__)
logger = logging.getLogger(__name__)


# An example user authenticated endpoint.
@user_api.route("/user", methods=["GET"])
@user_only
def get_user(user_id, user_email):
    return jsonify(user_id)


@user_api.route("/enrollments", methods=["GET", "POST", "DELETE"])
@user_only
def enrollments(user_id, user_email):
    data = request.json
    e_id = request.args.get('enrollment_id')
    method = request.method

    if method == 'GET':
        if e_id is None:
            query = Enrollments.select().dicts()
            enrollments = [e for e in query]
            result = enrollments
        else:
            result = Enrollments.get(id=e_id)
    elif method == 'POST':
        study_id = data.get('study_id')
        result = Enrollments.create(user=user_id, study=study_id)
        result = model_to_dict(result)
        del result['study']
        del result['user']
    elif method == 'DELETE':
        study_id = request.args.get('study_id')
        query = (Enrollments
                     .delete()
                     .where(
                         Enrollments.study_id == study_id and
                         Enrollments.user_id == user_id))
        result = query.execute()

    response = jsonify(result) if result != '' else ''
    return response
