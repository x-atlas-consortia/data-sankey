# data-sankey
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
        url: 'https://entity.api.sennetconsortium.org/datasets/sankey_data'
        token: 'groups token here'
    }
}
<react-consortia-sankey id='js-sankey' options={btoa(JSON.stringify(ops))} />
```

#### Via the setOptions method
```
const el = document.getElementById('js-sankey')
el.setOptions({
    api[obj], // {api: {url[str], token[str]}}
    filters[obj], // {column_name: str}
    dataCallback[function(row)], // returns filtered data
    validFilterMap[obj], // {column_name: str}
    d3[obj], //{d3, d3sankey, sankeyLinkHorizontal }
    styleSheetPath[str] // publicly accessible url to stylesheet
})

```