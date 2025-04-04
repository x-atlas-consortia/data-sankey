# Data Sankey (xac-sankey)
Reusable component for displaying consortia data visualization

## Usage
### React
```
import 'xac-sankey/dist/xac-sankey.css'

function Sankey() {
    useEffect(() => {
        import('xac-sankey')
    }, [])

    return (
        <>
            <react-consortia-sankey />
        </>
        )
}
```

### Static Html
```
<html>
<head>
    <title>DS</title>
    <script type="module" src="./js/ConsortiaSankey.js"></script>
    <link rel="stylesheet" href="./xac-sankey.css" />
</head>
<body>
<div class="c-sankey">
    <consortia-sankey />
</div>
</body>
</html>
```

### Passing options
#### Via Attributes
String value options can be passed to the options attribute. It takes a stringified object converted in base64 via the `btoa` method.
```
const ops = {
    api: {
        sankey: 'https://entity.api.sennetconsortium.org/datasets/sankey_data'
        token: 'groups token here'
    }
}
<react-consortia-sankey id='js-sankey' options={btoa(JSON.stringify(ops))} />
```

#### Via the setOptions method
```
const el = document.getElementById('js-sankey')
el.setOptions({
    api[obj], // {api: {sankey[str], token[str], ubkg[obj]}}
    filters[obj], // {column_name: str}, key-value pair to filter data on
    dataCallback[function(row)] -> list[obj], // returns list of objects of filtered data
    validFilterMap[obj], // {column_name: str}
    d3[obj], // {d3, d3sankey, sankeyLinkHorizontal } // the d3 library and related functions for building the graph
    loading[obj], // {html[str], callback[function(ctx)]} // loading html and callback
    styleSheetPath[str] // publicly accessible url to stylesheet
})

```

## Dev
```angular2html
npm run all // starts watcher and serves example for viewing results
npm run dist // builds distribution
npm run example // serves distribution with example implementation
```