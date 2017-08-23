{% if is_home() %}
    {% set arr = num_toArray(page.total) %}
    {% for p in arr %}
        {% if p > 1 %}
        <link rel="prefetch" href="{{ url_for(config.pagination_dir + '/' + p + '/') }}" />
        {% endif %}
    {% endfor %}
{% endif %}

{% if is_category() %}
    {% set arr = num_toArray(page.total) %}
    {% for p in arr %}
        {% if p > 1 %}
        <link rel="prefetch" href="{{ url_for(config.category_dir + '/' + page.category + '/' + p + '/') }}" />
        {% endif %}
    {% endfor %}
{% endif %}

{% if is_tag() %}
    {% set arr = num_toArray(page.total) %}
    {% for p in arr %}
        {% if p > 1 %}
        <link rel="prefetch" href="{{ url_for(config.tag_dir + '/' + page.tag + '/' + p + '/') }}" />
        {% endif %}
    {% endfor %}
{% endif %}