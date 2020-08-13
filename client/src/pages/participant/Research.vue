<template>
    <LoggedinSidebarTemplate page_name="research">
        <template v-slot:main-content>
            <div class="max-w-xl mx-auto mb-10 sm:mb-0 min-h-screen">
                <div class="max-w-xl mx-auto lg:px-4">
                <div id="explanation" ref="explanation" class="relative w-full" tabindex="-1" style="top: -4.2rem;"></div>

                    <section id="core-data" class="sect">
                        <div class="flex items-center w-full mb-2">
                            <!-- eslint-disable-next-line max-len --><!-- prettier-ignore -->
                            <div class="sano-border-shine sano-border-shine-orange bg-white w-7 h-7 rounded mr-3 flex flex-col justify-center items-center">
                                <svg class="pl-px w-5 h-3 relative sano-svg-red-orange z-10">
                                    <use xlink:href="#sano-symbol" />
                                </svg>
                            </div>
                            <h2 class="text-sano-burgundy text-xl">
                                My Studies
                            </h2>
                        </div>
                        <div class="flex mb-2">
                          <table>
                          <thead>
                            <tr>
                              <th>Study</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in $store.getters.studies" :key="item.created_at" class="text-sano-burgundy" style="border-bottom: solid #ddd">
                              <td>{{ item.title }}</td>
                              <td v-if="$store.getters.enrollments.includes(item.id)">
                                Enrolled
                              </td>
                              <td v-else>Not Enrolled</td>
                              <td v-if="$store.getters.enrollments.includes(item.id)">
                                <button style="padding: 10px" @click="$store.dispatch('deleteEnrollment', item.id)">
                                  Leave study
                                </button>
                              </td>
                              <td v-else>
                                <button style="padding: 10px" @click="$store.dispatch('addEnrollment', item.id)">
                                  Join Study
                                </button>
                              </td>
                            </tr>
                          </tbody>
                          </table>
                        </div>
                    </section>

                    </div>
                </div>
                </div>
            </div>
        </template>
        <template v-slot:sidebar-content>
        </template>
    </LoggedinSidebarTemplate>
</template>

<script>

import LoggedinSidebarTemplate from "@/layouts/LoggedinSidebarTemplate";

export default {
    name: "Research",
    components: {
        LoggedinSidebarTemplate,
    },
    created() {
      this.$store.dispatch('loadStudies');
      this.$store.dispatch('loadEnrollments');
    },
};
</script>

<style scoped lang="scss">
.mobile-sticky {
    top: 1rem;
}

.sect {
    @apply relative mt-6 mx-4 px-4 py-6 border border-sano-pink rounded overflow-hidden bg-white;
    @media (min-width: 992px) {
        @apply p-8 mx-0;
    }
}

@media (max-width: 575px) {
    .mobile-sticky {
        @apply sticky bg-white -ml-4 px-4 border-b border-sano-pink;
        z-index: 99;
        top: 0;
        width: calc(100% + 2rem);
    }

    .sano-toggle-label.sano-toggle-label {
        padding: 0 0.75rem;
    }
}
</style>
