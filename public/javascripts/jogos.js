$(function() {
    $("#pesquisar-jogo").autocomplete({
        source: function(request, response) {
            $.ajax({
                method: "get",
                url: "https://api.rawg.io/api/games",
                headers: { "Content-Type": "application/json" },
                data: {
                    key: "1b2194a5ff194db589fd282e7664cd9b",
                    search_exact: true,
                    search_precise: true,
                    search: request.term,
                    ordering: "metacritic",
                    exclude_additions: 1
                },
                success: function(data) {
                    response(data.results.map(item => ({
                        label: item.name,  // O valor que será exibido na lista de sugestões
                        value: item.id     // O valor que será inserido no campo de entrada ao selecionar
                    })));
                }
            })
        }
    });
});