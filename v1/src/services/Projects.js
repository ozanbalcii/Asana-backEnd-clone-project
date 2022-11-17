
//burası modelde oluşturulan şeylerin kayıt işlemini (DATA BASE İŞLEMLERİNİ) gerçekleştirmek ve hata varsa yönlendirme yapmak içindir.
//*services altındakinleri  controllers'da kullanıyoruz.

const Project = require("../models/Projects");// user modeli alcaz cunku burada kaydedilecek mongoya


// kayıt işlemi gerçekleştirilecek:
const insert = (data) => {
    const project = new Project(data); 
    return project.save();  //*save'i return etmezsek, bir hata vb durumunu veya işlem dogru mu yapılıyor bilemeyiz.
};                           // save'i return edersek hataları yakalayabileceğimiz hale gelir
                             // hataları, insert nerde(controllers>project.js) çalışıtırıyorsam creat içinde kontrol edeceğim
                             // hatta catch ile yakalıyoruz hataları


const list = (where) => {  //* list'e sonucları attık. (where'i controllers/users->projectList için kullanıyoruz.)
    // boş find({}) yaparsak sonucları donuduruyor, yazarsak buluyor onu ve onu dönüdürüyor.
    return Project.find(where ||  {}).populate({ // populate komutu ile dolduruyoruz. (models'de user_id'yi tanımlasaydık yapamazdık bunu çünkü user_id ile modelsdeki tanımlanan type ve ref'in veri tiplerini kullandık,
                                                 // eğer kullanmasaydık, ref: user' yani referans aldıgı yer user. Bu demek oluyor ki user_id'nin user'dan populate olacağı ref:user sayesinde oluyor.
        path : "user_id",  // doldurmak istediğimiz 
        select : "name email", // bu bilgileri getir
        // populate ile doldurarak yukardaki bilgileri bastırmıs oluyoruz.

    })  
}

 // burada update işlemi için kaydı bulcaz. Bulma işlemi ise id ile kaydı bulma şeklinde olacak.
const modify = (data, id) => { //data: update olacak datadır.  id:id'den update olacak datayı bulacağız
    // return Project.findById(id).then(project => {  // project yazılmasının sebebi: id bulduk burdan pojecti getircez ki kayıt gelsin
    //     project.name  = data?.name // data içersindeki name'i al, project'in içersindeki name'e yaz
    //     return project.save();
    // });
    
    // yukardakini tek satırda yapabiliriz: mongoose siteniden findByIdUpdate kullanımına göre yapabiliriz:
    return Project.findByIdAndUpdate(id, data, {new : true});
};

module.exports = {
    insert,
    list,
    modify,
};