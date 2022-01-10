async function main() {
    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    
    let response = await fetch("https://api.twelvedata.com/time_series?&symbol=GME,MSFT,DIS,BNTX,EUR/USD,ETH/BTC:Huobi,TRP:TSX&interval=1day&apikey=5587d70af13d4dbeb4b49f7bb0f0de3e")
    let result = await response.json()

    const { GME, MSFT, DIS, BNTX } = result;
    const  stocks = [GME, MSFT, DIS, BNTX];


    const myTimeChart = new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.reverse().map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
                borderWidth: 1
            
            }))

        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    const myHighChart = new Chart( highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(value => value.meta.symbol),
            datasets:  ({
                label: getHighest(stocks),
                data:  getHighest(stocks),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
                borderWidth: 1
            
            })

        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    function getHighest(arr1){
       return arr1.sort((arr1, arr2) => arr1.values.high - arr2.values.high)
    }

    console.log(getHighest(stocks))
    function getColor(stock) {
        if (stock === "GME") {
            return `rgba(61, 161, 61, 0.7)`
        }
        if (stock === "MSFT") {
            return `rgba(209, 4, 25, 0.7)`
        }
        if (stock === "DIS") {
            return `rgba(18, 4, 209, 0.7)`
        }
        if (stock === "BNTX") {
            return `rgba(166, 43, 158, 0.7)`
        }
    }
    let dayTime = stocks[0].values.map(value => value.datetime)
    console.log(dayTime)
}

main()

console.log(Chart)