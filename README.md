# kevinleutzinger.com

This is my static site. I've been hacking on it for a good number of years

### Add my button to your website

```html
<script type="text/javascript">
    (function () {
        const cdn_script_url = 'https://cdn.jsdelivr.net/npm/kevbadge/kevbadge.js';
        let kevbadge = document.createElement('script'); kevbadge.type = 'text/javascript'; kevbadge.async = true;
        kevbadge.src = cdn_script_url;
        let s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(kevbadge, s);
    })();
</script>
```

or paste the contents of [kevbadge.js](https://raw.githubusercontent.com/kleutzinger/kleutzinger.github.io/master/site-generator/kevbadge.js) into the developer console anywhere on your site
