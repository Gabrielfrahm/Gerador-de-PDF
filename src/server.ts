import express from 'express';
import ejs from 'ejs';
import path from 'path';
import puppeteer  from 'puppeteer';

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

app.get('/pdf',  async (request, response) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:3333', {
        waitUntil: 'networkidle0',
    })

    const pdf = await page.pdf({
        printBackground: true,
        format: 'letter',
    })

    await browser.close();

    response.contentType('application/pdf');

    return response.send(pdf)
})

app.get('/', (request, response) =>{
    const filePath = path.resolve(__dirname, 'print.ejs');
    ejs.renderFile(filePath, { passengers}, (err, data) =>{
        if(err){
            return response.send('erro na leitura do arquivo')
        }

       return response.send(data)
        
    });
})



app.listen(3333, ()=> {
    console.log('no ar')
})

