
    window.onload = function() {
       
        var cordinates = {}
        var heatDiv = document.getElementsByTagName('html')[0];      
        
       
        var script = document.createElement('script');
        script.src = "https://unpkg.com/axios/dist/axios.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);
        getData()
        getClick()
    
    
        window.onunload = function () {
          
            send()
        }
    
        
    
        var links = document.querySelectorAll("a");
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", function (e) {
            //alert('O elemento clicado foi o ' + this.innerHTML);
            send()    
            })
        }
    
        async function send() {
            req = {
                "user": idUser,
                "url":  window.location.href,
                "heatmap": JSON.stringify(cordinates)
            }

            axios({
                method: 'post', // verbo http
                url: 'https://heatmap404.herokuapp.com/api/heatmap/notify', // url
                data: { req }
                })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })

            cordinates = {}
            getData()

            }
    
            function getClick() {  
                
                 heatDiv.onclick = heatDiv.onclick = function(e) {
                   
                    var x = e.layerX;
                    var y = e.layerY;
                    // if (e.touches) {
                    //   x = e.touches[0].pageX;
                    //   y = e.touches[0].pageY;
                    // }
                  
                   cordinates[date].push({x,y})
                 
            
                }    
           
            
            }

            function getData() {
                var today = new Date()
                    year = today.getFullYear()
                    day = today.getDay() < 10 ? '0' + today.getDay() : today.getDay()
                    console.log(day)
                    month = today.getMonth() < 10 ? '0' + today.getMonth() : today.getMonth()
                    date = year + '-' + month + '-'+ day
        
                    cordinates[date] = []
            }
        }
        