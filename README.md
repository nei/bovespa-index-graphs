# bovespa-index-graphs

Graphs to show in a different way data from the Brazilian Stock Market BMF&Bovespa, just for fun.

### Index Composition Bubbles 

This graph shows how big is the share of a individual paper in the determination of the total index. Data is beign grouped by sector.

![Ibovespa Composition](https://user-images.githubusercontent.com/33385/30187896-aff520bc-9423-11e7-9146-661fdee7692d.png)

### Install
```
git clone git@github.com:nei/bovespa-index-graphs.git
cd bovespa-index-graphs
npm install
node generateData.js
```
This script will scrap some data from Yahoo website, you will see something like this:
```
collecting data for ABEV3
collecting data for BBAS3
collecting data for BBDC3
collecting data...
```

### Data Source

http://www.bmfbovespa.com.br/
