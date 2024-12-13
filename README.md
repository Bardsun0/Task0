# Banner CRUD Uygulaması

Bu proje, bir banner yönetim sistemi oluşturmak için tasarlanmış bir Next.js uygulamasıdır. Proje, Next.js, Prisma, MongoDB ve React teknolojilerini kullanarak bir CRUD (Create, Read, Update, Delete) işlemleri örneği sunar.

## Özellikler
- **Create (Oluştur):** Yeni bir banner kaydı oluşturabilirsiniz.
- **Read (Oku):** Mevcut banner kayıtlarını görüntüleyebilirsiniz.
- **Update (Güncelle):** Bir banner kaydını güncelleyebilirsiniz.
- **Delete (Sil):** Bir banner kaydını silebilirsiniz.

## Kullanılan Teknolojiler
- **Next.js**: Full-stack React framework'ü.
- **Prisma**: ORM aracı olarak kullanılmıştır.
- **MongoDB**: Veritabanı.
- **React Toastify**: Bildirim mesajları için kullanılmıştır.
- **Tailwind CSS**: Kullanıcı arayüzü tasarımı.

## Kurulum
Projenin çalıştırılması için aşağıdaki adımları izleyin:

1. **Depoyu Klonlayın:**
   ```bash
   git clone <repo-url>
   cd <repo-name>
   ```

2. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

3. **.env Dosyasını Ayarlayın:**
   Aşağıdaki ortam değişkenlerini `.env` dosyasına ekleyin:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   DATABASE_URL=<MongoDB bağlantı URL>
   ```

4. **Prisma Kurulumu:**
   Prisma'yı çalıştırın ve veritabanını senkronize edin:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Uygulamayı Çalıştırın:**
   ```bash
   npm run dev
   ```
   Uygulama `http://localhost:3000` adresinde çalışacaktır.

## API Endpoints

### GET `/api/other/generalTopPageBanner`
Tüm banner verilerini getirir.

### POST `/api/dashboard/admin/generalTopPageBanner`
Yeni bir banner kaydı oluşturur veya mevcut bir banner'ı günceller.
- **Gerekli Veriler:**
  ```json
  {
    "mainText": "",
    "mainTextColor": "",
    "underText": "",
    "underTextColor": "",
    "buttonColor": "",
    "backgroundColor": "",
    "isActive": true
  }
  ```

### PUT `/api/dashboard/admin/generalTopPageBanner`
Mevcut bir banner'ı günceller.
- **Gerekli Veriler:**
  ```json
  {
    "id": "",
    "mainText": "",
    "mainTextColor": "",
    "underText": "",
    "underTextColor": "",
    "buttonColor": "",
    "backgroundColor": "",
    "isActive": true
  }
  ```

### DELETE `/api/dashboard/admin/generalTopPageBanner`
Mevcut bir banner'ı siler.
- **Gerekli Veriler:**
  ```json
  {
    "id": ""
  }
  ```

## Kullanım
1. **Banner Verilerini Görüntüleme:**
   - Ana sayfa yüklendiğinde mevcut banner verileri GET isteği ile çekilir ve gösterilir.

2. **Banner Güncelleme:**
   - Form alanlarını doldurun ve "Güncelle" butonuna tıklayın. Veriler PUT isteği ile güncellenir.

3. **Banner Silme:**
   - "Sil" butonuna tıklayın. Banner, DELETE isteği ile silinir.

4. **Yeni Banner Oluşturma:**
   - Formu doldurun ve POST isteği ile yeni bir banner oluşturun.

## Ekran Görüntüsü
Ekran görüntülerini burada paylaşabilirsiniz (isteğe bağlı).


