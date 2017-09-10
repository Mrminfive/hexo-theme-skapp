{% if page.comments && config.gitTalk %}
    <link rel="stylesheet" href="https://unpkg.com/gitalk/dist/gitalk.css">
    <script src="https://unpkg.com/gitalk/dist/gitalk.min.js"></script>

    <script>
        var tags = [{% for tag in page.tags %}'{{ tag.name }}', {% endfor %}];

        var gitalk = new Gitalk({
          clientID: '{{ config.gitTalk.clientId }}',
          clientSecret: '{{ config.gitTalk.clientSecret }}',
          repo: '{{ config.gitTalk.repo }}',
          owner: '{{ config.gitTalk.owner }}',
          admin: [{% for item in config.gitTalk.admin %}'{{ item }}', {% endfor %}],
          labels: tags
        });

        gitalk.render('comment-container');
    </script>
{% endif %}