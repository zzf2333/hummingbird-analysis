<script setup lang="ts">
const online = useOnline()
</script>

<template>
    <div>
        <Suspense>
            <ClientOnly>
                <div text-gray:80>You're offline</div>
            </ClientOnly>
        </Suspense>
    </div>
</template>
