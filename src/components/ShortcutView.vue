<template>
    <div style="height: 100%;">
        <ul class="shortcut-row">
            <li v-for="key in shortcuts">
                <button class="key r-border shortcut"
                    tag="button"
                    :class="('keycodeof-' + key.keyCode)"
                    :disabled="(!key.enabled)"
                    v-tap="{ methods: onButtonClick, entity: key }">{{ key.text }}</button>
            </li>
        </ul>
        <div id="showall" v-tap="{ methods: onShowMoreClick }">显示全部</div>
    </div>
</template>

<script>
module.exports = {
    props: ["shortcuts"],
    methods: {
        onButtonClick: function(params) {
            var key = params.entity;
            if(key.enabled) {
                this.$emit("onkeyclick", key);
            }
        },
        onShowMoreClick: function(){
            this.$emit("onshowmoreclick");
        }
    }
}
</script>

<style scoped>
ul.shortcut-row {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    list-style: none;
    justify-content: space-between;
    -webkit-box-pack: justify;
    justify-content: center;
    -webkit-justify-content: center;
    height: 20%;
}

ul.shortcut-row > li {
    -webkit-box-flex: 0.25;
    -webkit-flex: 0 1 -webkit-calc((100% - 20px*4) / 5);
    flex: 0 1 calc((100% - 20px*4) / 5);
    height: 100%;
}

/*按键左右间隔为5像素*/
ul.shortcut-row > li:not(:last-child) {
    margin-right: 20px;
}

div#showall {
    color: #29A0DC;
    font-size: 16px;
    padding: 20px;
}

</style>