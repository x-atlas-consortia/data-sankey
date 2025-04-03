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
