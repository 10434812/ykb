var vm = new Vue({
    el: '#app',
    data: {
        someData: '',
        image: 'https://uk.5zixi.com/app4friendv2'
    },
    methods: {
        Show: function(data) {
            if (data.indexOf('qlogo') != -1) {
                return data;
            } else {
                return 'https://uk.5zixi.com/app4friendv2' + data;
            }
        },
        zan: function(data, index) {
            var Url = 'https://uk.5zixi.com/app4friendv2/portal_appBaseQuery.jspx?';
            Url += 'project=COFFEESAY';
            Url += '&modul=insertCoffeeZan';
            Url += '&returnType=UPDATE';
            Url += '&userid=' + 52322;
            Url += '&coffeeid=' + data;

            this.$http.get(Url).then(res => {}, err => {});
            this.someData[index].zan_num++;
        }

    },
    mounted: function() {
        this.$http.get('https://uk.5zixi.com/app4friendv2/portal_appBaseQuery.jspx?project=COFFEESAY&modul=listAllCoffeeSay&returnType=LIST&userid=52322&pageSize=4&currentPage=1').then(response => {
            this.someData = eval('(' + response.body + ')');
        }, response => {
            console.log("error");
        });
    }
});
