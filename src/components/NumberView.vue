<template>
    <div id="input-widget" class="r-border">
        <div id="mode-switcher" 
            v-tap="{methods: onModeChanged}" 
            :class="'modeof-' + mode"/>
        <ul id="inputrow">
            <li class="cell"
                v-for="(text, index) in numberArray"
                :class="'lengthof-' + numberArray.length"
                :selected="(index == selectedIndex)">
                    <button class="key" 
                        v-tap="{methods: onCellSelected, index: index}">{{ text }}</button>
                </li>
        </ul>
    </div>
</template>

<script>
module.exports = {
    props: ["numberArray", "mode", "selectedIndex"],
    methods: {
        onModeChanged: function(){
            this.$emit("onmodechanged");
        },
        onCellSelected: function(params){
            this.$emit("oncellselected", params.index);
        }
    }
}
</script>

<style scoped>
div#input-widget {
    border: 1px solid #cccccc;
}

div#mode-switcher {
    border-right: 1px solid #cccccc;
    -webkit-box-flex: 0.10;
    -webkit-flex: 0 1 10%;
    flex: 0 1 10%;
    text-align: center;
    background-position: center;
	background-repeat: no-repeat;
    background-size: 8.5vh;
}

@media all and (min-width:640px){ div#mode-switcher { background-size: 9vh; } }
@media all and (max-width:480px){ div#mode-switcher { background-size: 7vw; } }

ul#inputrow {
    -webkit-box-flex: 0.90;
    -webkit-flex: 0 1 90%;
    flex: 0 1 90%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    list-style: none;
    padding: 0;
    margin: 0;
    height: 100%;
}

ul#inputrow > li{
    height: 100%;
}

ul#inputrow > li.lengthof-8 {
    -webkit-box-flex: 0.125;
    -webkit-flex: 0 1 12.5%;
    flex: 0 1 12.5%;
}

ul#inputrow > li.lengthof-7 {
    -webkit-box-flex: 0.1428;
    -webkit-flex: 0 1 14.28%;
    flex: 0 1 14.28%;
}

ul#inputrow > li.cell > button { font-size: 5vh; }
/*Landscape*/
@media all and (min-width:640px){
  ul#inputrow > li.cell > button { font-size: 9vh; }
}

/*Portrait*/
@media all and (max-width:480px) {
  ul#inputrow > li.cell > button { font-size: 7vw; }
}

ul#inputrow > li:not(:last-child) {
    border-right: 1px solid #cccccc;
}

ul#inputrow > li[selected=selected] {
    border: 1px solid #29a0dc;
}

/*Mode 5 新能源键盘图标启用状态 */
div#mode-switcher.modeof-5,div#mode-switcher.modeof-0 {
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc5OCcgaGVpZ2h0PSc5OCcgdmlld0JveD0nMCAwIDk4IDk4Jz48ZGVmcz48c3R5bGU+LmV2ZW5vZGQge2ZpbGwtcnVsZTogZXZlbm9kZDt9PC9zdHlsZT48L2RlZnM+PGNpcmNsZSBmaWxsPScjMzA5NzdkJyBjeD0nNDknIGN5PSc0OScgcj0nNDgnLz48Y2lyY2xlIGZpbGw9JyM1OGI4YTAnIGN4PSc0OScgY3k9JzQ5JyByPSc0NCcvPjxwYXRoIGZpbGw9JyMzNmIwZTQnIGNsYXNzPSdldmVub2RkJyBkPSdNMTIuMTI5LDI1YTQzLjk4Niw0My45ODYsMCwwLDEsNzMuNzQxLDBIMTIuMTI5WicvPjxwYXRoIGZpbGw9JyMzOGJlNzAnIGNsYXNzPSdldmVub2RkJyBkPSdNMTIuMTI5LDczSDg1Ljg3MUE0My45ODYsNDMuOTg2LDAsMCwxLDEyLjEyOSw3M1onLz48cGF0aCBmaWxsPScjZWM0Njg4JyBjbGFzcz0nZXZlbm9kZCcgZD0nTTEyLjEyOSwyNUg4NS44NzFhNDMuNzMzLDQzLjczMywwLDAsMSw2LjIsMTVINS45MjVBNDMuNzMzLDQzLjczMywwLDAsMSwxMi4xMjksMjVaJy8+PHBhdGggZmlsbD0nI2QwZTIzZicgY2xhc3M9J2V2ZW5vZGQnIGQ9J002LjE1NSw1OUg5MS44NDVhNDMuNzQyLDQzLjc0MiwwLDAsMS01Ljk3NCwxNEgxMi4xMjlBNDMuNzQzLDQzLjc0MywwLDAsMSw2LjE1NSw1OVonLz48cGF0aCBmaWxsPScjZWM5ODQxJyBjbGFzcz0nZXZlbm9kZCcgZD0nTTUsNDlBNDQuMDkyLDQ0LjA5MiwwLDAsMSw2LjE1NSwzOUg5MS44NDVhNDMuODU2LDQzLjg1NiwwLDAsMSwwLDIwSDYuMTU1QTQ0LjA5Miw0NC4wOTIsMCwwLDEsNSw0OVonLz48cGF0aCBmaWxsPScjZmZmZmZmJyBjbGFzcz0nZXZlbm9kZCcgZD0nTTUuMDUxLDUxSDYxdjRINS40MThDNS4yMzgsNTMuNjg0LDUuMTExLDUyLjM1MSw1LjA1MSw1MVptMC4zNjctOEg2MXY0SDUuMDUxQzUuMTExLDQ1LjY0OSw1LjIzOCw0NC4zMTYsNS40MTgsNDNaJy8+PHBhdGggZmlsbD0nIzEwMjYxZScgY2xhc3M9J2V2ZW5vZGQnIGQ9J002MSw5MS4zM1Y3M0gzNS4yMTVMMjUuMDYzLDYyLjgzNmEyLjk4NCwyLjk4NCwwLDAsMSwuNzU4LTUuODE4YzAtLjAwNiwwLTAuMDEyLTAuMDA1LTAuMDE4SDYxVjQxSDI1LjIyMWMwLjAyNi0uMDI5LjA0NS0wLjA2MywwLjA3LTAuMDkzQTIuOTc0LDIuOTc0LDAsMCwxLDIzLjcsMzYuMWMtMC4wNjItLjAxNS0wLjEyLTAuMDM4LTAuMTgyLTAuMDQ4TDM0LjksMjVINjFWNi42N0E0NCw0NCwwLDAsMSw2MSw5MS4zM1onLz48cGF0aCBmaWxsPScjZmZmZmZmJyBjbGFzcz0nZXZlbm9kZCcgZD0nTTY1LDg1LjAwNlY2OUgzN2wtOC04SDY1VjM3SDI5bDgtOEg2NVYxMi45OTRBMzkuMDEsMzkuMDEsMCwwLDEsNjUsODUuMDA2WicvPjwvc3ZnPg==");
}

/*Mode 0 新能源键盘图标禁用状态 */
div#mode-switcher.modeof-0 {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray;
}

</style>