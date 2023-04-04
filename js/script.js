function searchMovie() {
  $("#movie-list").html("");

  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "81ec860b",
      s: $("#search-input").val(),
    },
    success: function (hasil) {
      if (hasil.Response == "True") {
        let movies = hasil.Search;

        $.each(movies, function (i, data) {
          $("#movie-list").append(
            `
                <div class="col-md-3">
                    <div class="card">
                        <img class="card-img-top" src="` +
              data.Poster +
              `">
                        <div class="card-body">
                        <h5 class="card-title">` +
              data.Title +
              `</h5>
                  <h6 class="card-subtitle mb-2 text-muted">` +
              data.Year +
              `</h6>
                  
                        </div>
                    </div>
                </div>
                `
          );
        });
        // menjadikan kolom seach menjadi kosong setelah user mengklik search
        $("#search-input").val("");
      } else {
        $("#movie-list").html(
          `
            <div class="col">
                 <h1 class="text-center">` +
            hasil.Error +
            `</h1>
            </div>
            `
        );
      }
    },
  });
}

$("#search-button").on("click", function () {
  searchMovie();
});

$("#search-input").on("keyup", function (e) {
  if (e.keyCode === 13) {
    searchMovie();
  }
});
