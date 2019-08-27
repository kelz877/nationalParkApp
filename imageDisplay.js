var random_images_array = ["image1.jpg", "image2.jpg","image3.jpg", "image4.jpg", "image5.jpg","image6.jpg", "image7.jpg", "image8.jpg", "image9.jpg", "image10.jpg"]

function getRandomImage(imgAr, path){
    var path = path || '/images/';
    var num = Math.floor(Math.random() * imgAr.length);
    var img = imgAr[num]
    var imgStr = '<img class="jumbotron jumbotron-fluid topJumbotron" style="background-size: cover; background-repeat: no-repeat; margin-top: 20px;" src="' + path + img + '"alt = "">';
    document.write(imgStr)
    document.close()
}
