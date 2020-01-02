$(function() {

    let videoList = $("#videoList");
    videoList.find("li").remove();
    search("mr bean");

    $("#searchForm").on("submit", function(event) {
        event.preventDefault();
        videoList.find("li").remove();
        search($("#searchField").val());

    });

    function search(searchTerm) {
        $.ajax({
                method: "GET",
                url: "https://www.googleapis.com/youtube/v3/search",
                data: {
                    key: '',
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
                    let li = `<li class="list-group-item" id="${a.id.videoId}"><div class="media mb-3" >
                    <img class="align-self-center mr-2 d-none d-lg-block" src="${a.snippet.thumbnails.medium.url}" alt="">
                    <img class="align-self-center mr-2 d-block d-lg-none" src="${a.snippet.thumbnails.default.url}" alt="">
                    <div class="media-body" >
                        <h6 class="mt-0">${a.snippet.title}</h6>
                        <span>${ new Intl.DateTimeFormat().format(new Date(a.snippet.publishedAt))}</span>
                        <div class="description">${a.snippet.description}</div>
                    </div><div>
                </li>`;

                    videoList.append(li);

                });
            })
            .catch(function(msg) {
                alert("error: " + msg);
            });
    }

    videoList.on("click", "li", function(e) {
        let id = $(this).attr('id');
        let url = `https://www.youtube.com/embed/${id}?enablejsapi=1&origin=http://example.com`;
        $("#player").attr("src", url);

    });

});