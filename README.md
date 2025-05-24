Elang Surya Prananda
2410512113 - Website Development

DISCLAMMER!!
Agar sesuai dengan depedensi dan tidak error dengan versi user penerima, saya menghapus "node_modules"
untuk menggunakannya istall terlebih dahulu di terminal dengan "npm install"
dan untuk menjalankannya menggunakan:
    1. "npm init -y"
    2. "npm install"
    3. a. untuk tugas 1 "npm run start:tugas1"
          untuk tugas 2 "npm run start:tugas2"
       b. atau bisa refresh otomatis setiap perubahan dengan nodemon :
          untuk tugas 1 "npm run dev:tugas1"
          untuk tugas 2 "npm run dev:tugas2"
-------------------------------------------------------------------------------------------------------------------------

Tugas 1
pada file tugas1.js terdapat middleware dan auth middleware dengan token 2410512113
saya menggunakan fungsi CRUD (Create, Read, Update, Delete) dan memeberi 3 contoh di setiap fungsi CRUD
saya juga menggunakan endpointnya ke POSTMAN

------------------- CRUD ( CREATE, READ, UPDATE, DELETE ) -------------------
a. CREATE | Method: POST
    1. Menambahkan buku baru | URL: http://localhost:3001/books
        contoh penggunaan:
            body -> raw -> {
                                "title": "Book 1",
                                "author": "Author A",
                                "date_release": "2021-01-01"
                            }
            output: {
                        "message": "Book added",
                        "book": {
                            "id": 1748077392725,
                            "title": "Book 1",
                            "author": "Author A",
                            "date_release": "2021-01-01"
                        }
                    }

    2. Menambahkan buku baru tetapi dengan secure auth middleware | URL: http://localhost:3001/books/secure
        contoh penggunaan:
            headers -> authorization -> masukkan token "2410512113"
            body -> raw -> {
                                "title": "Book 2",
                                "author": "Author B",
                                "date_release": "2021-01-02"
                            }
            output: {
                        "message": "Secure book added",
                        "book": {
                            "id": 1748077473141,
                            "title": "Book 2",
                            "author": "Author B",
                            "date_release": "2021-01-02"
                        }
                    }

    3. Menambahkan buku sekaligus banyak ( lebih dari satu >1 ) | URL: http://localhost:3001/books/bulk
        contoh penggunaan:
            body -> raw -> {
                            "books": [
                                {
                                "title": "Book 3",
                                "author": "Author C",
                                "date_release": "2021-01-03"
                                },
                                {
                                "title": "Book 4",
                                "author": "Author D",
                                "date_release": "2022-02-04"
                                }
                            ]
                            }
            output: {
                        "message": "Books added",
                        "total": 2
                    }

b. READ | Method: GET
    1. Melihat semua buku yang tersedia | URL: http://localhost:3001/books
        contoh output: [
                        {
                            "id": 16789765432134,
                            "title": "Clean Code",
                            "author": "Robert C. Martin",
                            "date_release": "2008-08-01"
                        },
                        ...
                       ]

    2. Melihat suatu buku berdasarkan ID | URL: http://localhost:3001/books/:id
        contoh penggunaan:
            GET http://localhost:3001/books/16789765432134
        output: {
                    "id": 16789765432134,
                    "title": "Clean Code",
                    "author": "Robert C. Martin",
                    "date_release": "2008-08-01"
                }

    3. Melihat suatu buku berdasarkan judul | URL: http://localhost:3001/books/search/:keyword
        contoh penggunaan: GET http://localhost:3001/books/search/atomic
        output: [
                    {
                        "id": 13456789808865,
                        "title": "Atomic Habits",
                        "author": "James Clear",
                        "date_release": "2018-10-16"
                    }
                ]

c. UPDATE | Method: PUT and PATCH
    1. Mengubah semua buku | URL: http://localhost:3001/books/:id
        contoh penggunaan: PUT http://localhost:3001/books/16789765432134
        body -> raw -> {
                        "title": "Updated Clean Code",
                        "author": "Bob Martin",
                        "date_release": "2009-01-01"
                        }
        output: {
                    "message": "Book updated",
                    "book": {
                        "id": 16789765432134,
                        "title": "Updated Clean Code",
                        "author": "Bob Martin",
                        "date_release": "2009-01-01"
                    }
                }

    2. Mengubah judul suatu buku | method: PATCH | URL: http://localhost:3001/books/:id/title
        contoh penggunaan: http://localhost:3001/books/16789765432134/title
        body -> raw -> {
                        "title": "Clean Code v2"
                        }
        output: {
                    "message": "Title updated",
                    "book": {
                        "id": 16789765432134,
                        "title": "Clean Code v2",
                        "author": "Bob Martin",
                        "date_release": "2009-01-01"
                    }
                }

    3. Mengubah suatu buku tetapi menggunakan auth middleware | URL: http://localhost:3001/books/secure/:id
        contoh penggunaan: http://localhost:3001/books/secure/16789765432134
        headers -> authorization -> masukkan token "2410512113"
        body -> raw -> {
                        "title": "Clean Code Final",
                        "author": "Robert Martin",
                        "date_release": "2010-01-01"
                        }
        output: {
                    "message": "Secure update success",
                    "book": {
                        "id": 16789765432134,
                        "title": "Clean Code Final",
                        "author": "Robert Martin",
                        "date_release": "2010-01-01"
                    }
                }

d. DELETE | Method: DELETE
    1. Menghapus suatu buku berdasarkan ID | URL: http://localhost:3001/books/:id
        contoh penggunaan: http://localhost:3001/books/16789765432134
        output: {
                    "message": "Book deleted",
                    "deleted": [
                        {
                            "id": 16789765432134,
                            "title": "Clean Code Final",
                            "author": "Robert Martin",
                            "date_release": "2010-01-01"
                        }
                    ]
                }

    2. Menghapus semua buku yang tersedia | URL: http://localhost:3001/books
        contoh penggunaan: http://localhost:3001/books
        output: {
                    "message": "All books deleted"
                }

    3. Menghapus suatu buku berdasarkan judul | URL: http://localhost:3001/books/title/:titles
        contoh penggunaan: http://localhost:3001/books/title/Atomic Habits
        output: {
                    "message": "Deleted by title",
                    "deleted": 1
                }

di tugas1.js saya juga menambahkan error handling untuk mengetahui jika terdapat error Menampilkan output sesuai
yang saya berikan agar lebih mudah digunakan dan mengetahui sebabnya

-------------------------------------------------------------------------------------------------------------------------

Tugas 2
pada file tugas2.js terdapat juga middleware dan auth middleware dengan token 2410512113
saya menggunakan endpoint ke API eksternal milik google Books API untuk mengambil data buku
dan juga menggunakan depedensi ( axios ) untuk bisa mengambil API eksternal.
saya juga menggunakan endpointnya ke POSTMAN

Fungsi yang digunakan
a. Test | Method GET
    untuk mengetest apakah server berjalan | URL: http://localhost:3002/
b. Mencari buku dari Google Books API berdasarkan poin 
    untuk mencari berdasarkan poin | URL: http://localhost:3002/google-books/:query
        misalnya mencari buku harry potter : http://localhost:3002/google-books/harry potter
        output: [
                    {
                        "id": "OyB4llvAoXQC",
                        "title": "Harry Potter dan pangeran berdarah-campuran",
                        "authors": [
                            "J. K. Rowling"
                        ],
                        "publishedDate": "2006",
                        "description": "No description",
                        "pageCount": 824,
                        "categories": [
                            "Adventure stories"
                        ],
                        "thumbnail": "http://books.google.com/books/content?id=OyB4llvAoXQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                    },
                ] dan lain-lain

di tugas2.js saya juga menambahkan error handling sama seperti tugas1.js untuk mengetahui jika terdapat error
menampilkan output sesuai yang saya berikan agar lebih mudah digunakan dan mengetahui sebabnya