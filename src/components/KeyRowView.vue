<template>
    <ul class="keyrow" 
        :class="[ {'funcrow': (isfunc === true)}, ('rowsof-' + rowcount) ]">
        <li v-for="key in keys"
            :class="('keysof-' + keycount)">
            <button
                tag="button"
                class="key r-border txt-key"
                :class="[ ('keycodeof-' + key.keyCode), {'disabled': (!key.enabled)}]"
                :disabled="(!key.enabled)"
                v-tap="{methods: onButtonClick, entity: key }">{{ key.text | deleteTextFilter }}</button>
        </li>
    </ul>
</template>

<script>
module.exports = {
    props: ["rowcount", "keys", "isfunc", "keycount"],
    filters: {
        deleteTextFilter: function(text){
            if(!text || "←" === text) {
                return "";
            }else {
                return text;
            }
        }
    },
    methods: {
        onButtonClick: function(params) {
            var key = params.entity;
            if(key.enabled) {
                this.$emit("onkeyclick", key);
                this.$emit("onkeyevent", params.event, key);
            }
        }
    }
}
</script>

<style scoped>
ul.keyrow {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    flex-direction: row;
    flex-wrap: nowrap;
    list-style: none;
}

/*上下之间每行间隔*/
ul.keyrow:not(:first-child) {
    margin-top: 8px;
}

ul.rowsof-5 {
    height: -webkit-calc((100% - 8px * 4)/5);
    height: calc((100% - 8px * 4)/5);
}

ul.rowsof-4 {
    height: -webkit-calc((100% - 8px * 3)/4);
    height: calc((100% - 8px * 3)/4);
}

/*需要设置button在所有父节点上的百分比*/
ul.keyrow > li {
    height: 100%;
}

/*按键左右间隔为5像素*/
ul.keyrow > li:not(:last-child) {
    margin-right: 5px;
}

/*动态计算每个按键的宽度, 按每行10个按键来计算*/
ul.keyrow > li.keysof-10 {
    -webkit-box-flex: 0.095;
    -webkit-flex: 0 1 -webkit-calc((100% - 5px * 9)/10);
    flex: 0 1 calc((100% - 5px * 9)/10);
}

/*在最后一行最后一个键,肯定存在"确定"键,这个按键的宽度为2倍*/
ul.funcrow > li.keysof-10:last-child {
    -webkit-flex: 0 1 -webkit-calc((100% - 5px * 9)/10 * 2 + 5px);
    flex: 0 1 calc((100% - 5px * 9)/10 * 2 + 5px);
}

/* 增加9键样式 */
/*动态计算每个按键的宽度, 按每行9个按键来计算*/
ul.keyrow > li.keysof-9 {
    -webkit-box-flex: 0.12;
    -webkit-flex: 0 1 -webkit-calc((100% - 5px * 8)/8);
    flex: 0 1 calc((100% - 5px * 8)/9);
}

/*在最后一行最后一个键,肯定存在"确定"键,这个按键的宽度为2倍*/
ul.funcrow > li.keysof-9:last-child {
    -webkit-flex: 0 1 -webkit-calc((100% - 5px * 8)/9 * 2 + 5px);
    flex: 0 1 calc((100% - 5px * 8)/9 * 2 + 5px);
}

/* 增加11键样式 */
/*动态计算每个按键的宽度, 按每行9个按键来计算*/
ul.keyrow > li.keysof-11 {
    -webkit-box-flex: 0.9;
    -webkit-flex: 0 1 -webkit-calc((100% - 5px * 10)/11);
    flex: 0 1 calc((100% - 5px * 10)/11);
}

/*在最后一行最后一个键,肯定存在"确定"键,这个按键的宽度为2倍*/
ul.funcrow > li.keysof-11:last-child {
    -webkit-flex: 0 1 -webkit-calc((100% - 5px * 10)/11 * 2 + 5px);
    flex: 0 1 calc((100% - 5px * 10)/11 * 2 + 5px);
}

/*确定按键的背景颜色*/
button.keycodeof-2:not(:disabled) {
    background-color: #4e8af9;
    color: white;
}

/*删除按键，按键码为1*/
button.keycodeof-1 {
    color: transparent;
    background-position: center;
	background-repeat: no-repeat;
	background-size: 5vw;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NiIgaGVpZ2h0PSI0NiIgdmlld0JveD0iMCAwIDQ2IDQ2Ij48cGF0aCBmaWxsPSIjOTk5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00MiwzOUgxOGExLjk5LDEuOTksMCwwLDEtLjQ2Mi0wLjA1OSwzLjI2OCwzLjI2OCwwLDAsMS0yLjg4LS45MDZMMS45MTQsMjUuMjkxYTMuMjc3LDMuMjc3LDAsMCwxLDAtNC42MzRMMTQuNjU3LDcuOTE0YTMuMjY4LDMuMjY4LDAsMCwxLDMuMDA5LS44OEExLjk5MywxLjk5MywwLDAsMSwxOCw3SDQyYTQsNCwwLDAsMSw0LDRWMzVBNCw0LDAsMCwxLDQyLDM5Wk0zNy43LDE2Ljg0N0wzMS41MywyM2w2LjE0NSw2LjE0NWExLjA4NywxLjA4NywwLDEsMS0xLjUzNywxLjUzN0wyOS45OTEsMjQuNTRsLTYuMTI4LDYuMTE2YTEuMDg2LDEuMDg2LDAsMCwxLTEuNTM3LTEuNTM0TDI4LjQ1NSwyMywyMi4zLDE2Ljg1MWExLjA4NywxLjA4NywwLDAsMSwxLjUzNy0xLjUzN2w2LjE1NSw2LjE1NSw2LjE2OC02LjE1NkExLjA4NiwxLjA4NiwwLDEsMSwzNy43LDE2Ljg0N1oiLz48L3N2Zz4=");
}
</style>