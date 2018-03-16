{# index.swig #} 
{% if theme.math.enable %}
  {% set is_index_has_math = false %}

  {# At home, check if there has `mathjax: true` post #}
  {% if is_home() %}
    {% for post in page.posts %}
      {# If theme.math.per_page is true, only render those page who has 'mathjax: true' in Front Matter. #}
      {% if post.mathjax and not is_index_has_math %}
        {% set is_index_has_math = true %}
      {% endif %}
    {% endfor %}
  {% endif %}

  {% if not theme.math.per_page or (is_index_has_math or page.mathjax) %}
    
    {% if theme.math.engine == 'mathjax' %}
      {# include mathjax style #}        
        <script type="text/x-mathjax-config">
            MathJax.Hub.Config({
            tex2jax: {
                inlineMath: [ ['$','$'], ["\\(","\\)"]  ],
                processEscapes: true,
                skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
            }
            });
        </script>
        <script type="text/x-mathjax-config">
            MathJax.Hub.Queue(function() {
            var all = MathJax.Hub.getAllJax(), i;
                for (i=0; i < all.length; i += 1) {
                all[i].SourceElement().parentNode.className += ' has-jax';
                }
            });
        </script>      
        <script type="text/javascript" src="{{ theme.math.mathjax.cdn }}"></script>    
    
    {% elif theme.math.engine == 'katex' %}
        {# include katex style #}
        <link rel="stylesheet" href="{{ theme.math.katex.cdn }}" type="text/css">
   {% endif %}
  {% endif %}
{% endif %}






