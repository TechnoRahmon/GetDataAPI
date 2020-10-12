 
var axios = require('axios')
var fs = require('fs')
let DataArr=[]

const getData = async ()=>{
       
        var req=  await axios.get('https://adventure-app-29076.firebaseio.com/characters.json').then(data=>data)
        console.log('Getting Data ...');
    
        for (let i in req.data){
            DataArr.push(req.data[i]);
         }
         //console.log(DataArr);
        FilterData(DataArr);
   

    
}



var FilterData = async sub_data=> {
    
    
        //let sub_data=func();
        //console.log(sub_data);
        let b,e,r,s; 
        r=[]
        b=[]
        e=[];
        s=[];
             await sub_data.findIndex( (el,n,arr)=>{
              
                if (el.currentClass == 'rogue'){
                    r.push(el); 
                    
                }else if(el.currentClass == 'berserker' ){
                    b.push(el);
                }else if(el.currentClass == 'engineer' ){
                    e.push(el);
                }else if(el.currentClass == 'scribe' ){
                    s.push(el);
                }
            });
            console.log('Filter Done !\n');
            
            let arr=[b,e,r,s]
            WriteData( arr);


        }

       




const WriteData =   (sub_data)=>{
    
      setTimeout(()=>{
        for(let el of sub_data){
            if(el.length  >0){
                let myjosn = JSON.stringify(el)
                fs.writeFile(el[0].currentClass+'.json',myjosn,er=>{
                    if(er) throw er; 
                    console.log(el[0].currentClass+'.json'+' has been added! \n');
                })
            }else{
                console.log('Class is  emptey!\n');
            }
             
         }
     },1000)

        

}




getData()