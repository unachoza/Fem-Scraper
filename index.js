const PORT = 8000
const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')

const app = express()

app.get('/', (req, res) => {
  res.json('Hello welcome to my femists api. Quotes from impressive women! ')
})

const Women = []

app.get('/quotes', (req, res) => {
  axios.get('https://www.harpersbazaar.com/culture/features/a4056/empowering-female-quotes/')
    .then((response) => {
      const html = response.data
      const $ = cheerio.load(html)

      $('p[class="body-text"]', html).each(function () {
        const herQuote = $(this).text()

        $(this).find('em > a').each(function () {
          let lady = $(this).text()
          Women.push({
            lady,
            herQuote
          })
        });
      
      })
      res.json(Women)
  }).catch(err => {console.log(err)})
})

app.get('/blackwomen', (req, res) => {
  axios.get('https://www.bustle.com/p/26-quotes-from-black-feminists-for-your-womens-march-sign-that-pay-homage-to-these-amazing-thinkers-7914973')
    .then((response) => {
      const html = response.data
      const $ = cheerio.load(html)
      $('div[class="QRZ CcH"]', html).each(function () {
        $(this).find('div > h2[class="itW zPj"]').each(function () {
           herQuote = $(this).text()
        });
        $(this).find('div > div[class="riU"] > p > a').each(function () {
          hn = $(this).text()
          herJob =  hn.substring(hn.indexOf(",") + 2)
          hn = hn.substring(0, hn.indexOf(','));
           herName = hn
       
        })
        Women.push({
          herName,
          herQuote,
          herJob
        })
      })
      console.log('these women', Women.length)
      // res.json(Women)
    }).catch(err => { console.log(err) })
  
  axios.get('https://www.ellevatenetwork.com/articles/8013-inspirational-quotes-from-black-women-pioneers')
    .then((response) => {  const html = response.data
      const $ = cheerio.load(html)
      $('div[class="formatted-content"]', html).each(function () {
        $(this).find('p').each(function () {
          herQuote = $(this).text()
          herName = herQuote.substring(herQuote.indexOf("-") + 2)
          herQuote = herQuote.substring(0, herQuote.indexOf("-"))
          Women.push({
            herName,
            herQuote,
          })
        });
     
      })
      let WomenNoDupes = []
      Women.forEach(w => {
        let women = Object.fromEntries(Object.entries(w).filter(([_, v]) => v != ""));
        WomenNoDupes.push(women)
      })

      console.log(WomenNoDupes.length)
      res.json(WomenNoDupes)
    }).catch(err => { console.log(err) })
})


// app.get('/ladies', (req, res) => {
//   axios.get('https://www.harpersbazaar.com/culture/features/g4201/famous-feminists-throughout-history/')
//     .then((response) => {
//       const html = response.data
//       console.log(html)
//       const $ = cheerio.load(html)
//       //slideshow-slide-hed
//       //div.slideshow-slide-dek p 

//       $(`.slideshow-slide-hed`, html).each( () => {
//         const lady = $(this).text()
//         console.log(lady)
//         Women.push({
//           lady
//         })
//       })
//       res.json(Women)

//   }).catch(err => {console.log(err)})
// })

// https://www.usatoday.com/in-depth/life/women-of-the-century/2020/08/13/blm-civil-rights-woman-history-feminism-metoo-movement/5491816002/
app.get('/han', (req, res) => {
  axios.get('https://www.britannica.com/explore/100women/the-women/activists')
    .then((response) => {
      const html = response.data
      const $ = cheerio.load(html)


      $(`.list__name`, html).each( () => {
        const lady = $(this).text()
        const url = $(this).attr('href')
        const dir = $(this).attr("dir", "ltr")
        console.log('tell me', this)
        Women.push({
          text: 'this woman' + lady,
          website: url
        })
      })

      res.json(Women)

  }).catch(err => {console.log(err)})
})

// app.get('/womenOfColor', (req, res) => {
//   axios.get('')
//     .then((response) => {
//       const html = response.data
//       console.log(html)
//       const $ = cheerio.load(html)
//       //slideshow-slide-hed
//       //div.slideshow-slide-dek p 

//       $(`p:contains('black')`,html).each( () => {
//         const lady = $(this).text()
//         ladyAndFriends.push({
//           lady : lady
//         })//       })
//       res.json(Women)

//   }).catch(err => {console.log(err)})
// })


app.listen(PORT, () =>  console.log(`listening on ${PORT}`))