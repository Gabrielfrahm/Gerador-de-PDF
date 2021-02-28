import express from 'express';
import ejs from 'ejs';
import path from 'path';
import pdf from 'html-pdf';


const app = express();


const passengers = [
    {
        name: 'Joyce',
        flightNumber: 7859,
        time: '18h00'
    },
    {
        name: 'Brock',
        flightNumber: 7859,
        time: '18h00'
    },
    {
        name: 'Eve',
        flightNumber: 7859,
        time: '18h00'
    }
]

app.get('/', (request, response) =>{
    const filePath = path.resolve(__dirname, 'print.ejs');
    ejs.renderFile(filePath, { passengers}, (err, data) =>{
        if(err){
            return response.send('erro na leitura do arquivo')
        }

        //config da pagina
        const options = {
            height: '11.25in',
            width: '8.5in',
            header: {
                height: '20mm',

            },
            footer: {
                height: "20mm"
            }
        }

        pdf.create(data, options).toFile('report.pdf',(err, data) =>{
            if(err){
                return response.send('erro ao gerar o pdf')
            }

            return response.send(data)
        } ); 


        
    });
})



app.listen(3333, ()=> {
    console.log('no ar')
})

