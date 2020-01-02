$(function() {

    let ul = $("#list");
    search("mr bean");

    $("#searchForm").on("submit", function(event) {
        event.preventDefault();
        ul.find("li").remove();
        search($("#searchInput").val());

    });

    function search(searchTerm) {
        $.ajax({
                method: "GET",
                url: "https://www.googleapis.com/youtube/v3/search",
                data: {
                    key: 'AIzaSyD-A54cg4_xQnDJCUtoY-ZWbm4DispeR58',
                    q: searchTerm,
                    part: 'snippet',
                    maxResults: 10,
                    type: 'video',
                    videoEmbeddable: true,
                }
            })
            .done(function(data) {
                let results = data.items;
                let id = results[0].id.videoId
                let url = `https://www.youtube.com/embed/${id}?enablejsapi=1&origin=http://example.com`;
                $("#player").attr("src", url);

                results.forEach((a) => {

                    let li = `<li class="media my-3" id="${a.id.videoId}">
                    <img class="mr-3" src="${a.snippet.thumbnails.medium.url}" alt="Generic placeholder image">
                    <div class="media-body m-3">
                        <h5 class="mt-0 mb-1">${a.snippet.title}</h5>
                        <h6>${ new Intl.DateTimeFormat().format(new Date(a.snippet.publishedAt))}</h6>
                        ${a.snippet.description}
                    </div>
                </li>`;

                    ul.append(li);
                });
            })
            .catch(function(msg) {
                alert("error: " + msg);
            });
    }

    ul.on("click", "li", function(e) {
        let id = $(this).attr('id');
        let url = `https://www.youtube.com/embed/${id}?enablejsapi=1&origin=http://example.com`;
        $("#player").attr("src", url);

    });

});