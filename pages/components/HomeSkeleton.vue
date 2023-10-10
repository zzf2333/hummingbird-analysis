<template>
    <div
        class="border dark:border-primary-600 border-primary-200 shadow-lg shadow-primary-200 dark:shadow-primary-700 rounded-md p-4 m-4 max-w-sm w-full mx-auto transition-all">
        <div class="animate-pulse">
            <div flex>
                <div bg-primary-200 dark:bg-primary-600 h-8 w-full rounded mr-2></div>
                <div bg-primary-200 dark:bg-primary-600 h-8 w-full rounded mr-2></div>
                <div bg-primary-200 dark:bg-primary-600 h-8 w-full rounded mr-2></div>
                <div bg-primary-200 dark:bg-primary-600 h-8 w-full rounded></div>
            </div>
            <div flex mt-2>
                <div bg-primary-200 dark:bg-primary-600 h-8 w-full rounded mr-2></div>
                <div bg-primary-200 dark:bg-primary-600 h-8 w-full rounded mr-2></div>
                <div bg-primary-200 dark:bg-primary-600 h-8 w-full rounded mr-2></div>
                <div bg-primary-200 dark:bg-primary-600 h-8 w-full rounded></div>
            </div>
            <div flex mt-4 h-26>
                <div flex-1 mr-1>
                    <div class="h-3 bg-primary-200 dark:bg-primary-600 w-3/12 rounded mb-2"></div>
                    <div class="h-20 bg-primary-200 dark:bg-primary-600 rounded"></div>
                </div>
                <div flex-1 ml-1>
                    <div class="h-3 bg-primary-200 dark:bg-primary-600 w-3/12 rounded mb-2"></div>
                    <div class="h-20 bg-primary-200 dark:bg-primary-600 rounded"></div>
                </div>
            </div>
            <div mt-4>
                <div class="h-3 bg-primary-200 dark:bg-primary-600 w-3/12 rounded mb-2"></div>
                <div class="h-20 bg-primary-200 dark:bg-primary-600 rounded"></div>
            </div>
            <div mt-4>
                <div v-for="row in 3" :key="row" grid grid-cols-5 gap-4 :class="[row !== 0 ? 'mt-2' : '']">
                    <div class="h-2 bg-primary-200 dark:bg-primary-600 rounded col-span-2"></div>
                    <div class="h-2 bg-primary-200 dark:bg-primary-600 rounded col-span-1"></div>
                    <div class="h-2 bg-primary-200 dark:bg-primary-600 rounded col-span-1"></div>
                    <div class="h-2 bg-primary-200 dark:bg-primary-600 rounded col-span-1"></div>
                </div>
            </div>
        </div>
    </div>
</template>
  