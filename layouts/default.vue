<template>
    <div class="flex flex-col h-screen">
        <div class="h-12 bg-white border-b-black border-b flex">
            <div class="w-12 h-12 border-r-black border-r flex items-center justify-center">
                <img src="favicon.ico" class="w-10 h-10">
            </div>
            <div class="flex-1 flex items-center justify-between ">
                <div class=" text-2xl font-normal ml-2">Автотранспортное Управление</div>
                <div class="flex flex-col items-end mr-2">
                    <span>Тестовый пользователь</span>
                    <span class="text-sm text-gray-400">Администратор</span>
                </div>
            </div>
        </div>
        <div class="flex flex-row flex-1">
            <div class="w-12 border-r-black border-r">
                123
            </div>
            <slot />
        </div>
    </div>
</template>