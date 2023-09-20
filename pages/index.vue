<script setup lang="ts">
const online = useOnline()
</script>

<template>
    <div>
        <Suspense>
            <ClientOnly>
                <div text-gray:80>You're offline</div>
            </ClientOnly>
            <template #fallback>
                <div italic op50>
                    <span animate-pulse>Loading...</span>
                </div>
            </template>
        </Suspense>
    </div>
</template>
