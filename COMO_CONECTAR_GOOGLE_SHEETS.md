# 📊 Guía de Conexión: Sincronizar Catálogo con Google Sheets

¡Hola Carlos y Víctor! He implementado un motor de sincronización dinámica en el showroom de **Ondas Studio**. 

Gracias a esto, Carlos puede añadir, modificar o eliminar canciones del showroom **directamente desde una hoja de cálculo de Google Sheets**, sin tocar el código y viendo los cambios reflejados en vivo en segundos.

Sigue estos sencillos pasos para activar la sincronización:

---

## 🛠️ Paso 1: Crear la Hoja de Cálculo en Google Sheets

1. Crea una hoja de cálculo en blanco en tu cuenta de Google Drive.
2. Define exactamente estas **9 columnas** en la primera fila (fila de cabeceras, en minúsculas y sin acentos):

| id | title | artist | album | cover | youtubeId | buyUrl | duration | lyrics |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |

### 📝 ¿Qué va en cada columna?

* **`id`**: Un identificador único para la canción (ej: `gka-equilibrio`, `gka-lospace`). Sin espacios.
* **`title`**: El título de la canción o beat (ej: `Equilibrio (Sencillo Oficial)`).
* **`artist`**: El artista (ej: `yosoygka (Ft. Jospone)`).
* **`album`**: Colección o álbum al que pertenece (ej: `Sencillos Oficiales`).
* **`cover`**: El enlace de la carátula o imagen. Puedes usar imágenes premium de Unsplash o subir carátulas a Imgur y pegar el enlace directo terminado en `.jpg` o `.png`.
* **`youtubeId`**: El ID del video de YouTube que suena de fondo. Es el código de 11 letras de la URL (ej: para `https://www.youtube.com/watch?v=QAQdclQr1qY`, el ID es `QAQdclQr1qY`).
* **`buyUrl`**: El enlace de WhatsApp pre-configurado para que te compren la pista (ej: `https://wa.me/56920074803?text=Hola%20GKA,%20me%20interesa...`).
* **`duration`**: La duración de la pista en minutos (ej: `3:10`).
* **`lyrics`**: *(Opcional)* Tus notas de mezcla o letras sincronizadas con el tiempo del reproductor. Se escriben en una sola celda separadas por barras verticales (`|`) con el formato `segundo:texto`.
  * **Ejemplo**: `0:🎵 [Inicio del Master] 🎵|5:Compresión cálida de válvulas analógicas|12:Espacialidad estéreo ampliada`

---

## 🌎 Paso 2: Publicar la Hoja de Cálculo en la Web

Para que el showroom pueda leer la hoja de cálculo sin contraseñas ni claves de API:

1. Ve a **Archivo** (File) > **Compartir** (Share) > **Publicar en la Web** (Publish to the Web).
2. En la ventana que aparece:
   * Cambia "Página web entera" por **Valores separados por comas (.csv)**.
3. Haz clic en el botón **Publicar** (Publish) y confirma.
4. **Copia el enlace que te genera Google Sheets**. Debe terminar en algo parecido a `.../pub?output=csv`.

---

## 🚀 Paso 3: Pegar el enlace en el código de la Web

1. Abre tu archivo [app.js](file:///h:/Mi%20unidad/OTD/ondas_studio/app.js) en tu editor.
2. En la línea **302**, localiza la constante `GOOGLE_SHEET_CSV_URL`:
   ```javascript
   const GOOGLE_SHEET_CSV_URL = "AQUÍ_PEGA_TU_ENLACE_CSV";
   ```
3. Pega tu enlace de Google Sheets publicado dentro de las comillas.
4. Guarda el archivo, haz commit, push a GitHub, ¡y listo!

---

## 🛡️ Preguntas Frecuentes y Respaldo

* **¿Qué pasa si Google Sheets falla o no tengo internet?**
  No te preocupes. He implementado un **sistema de respaldo offline**. Si el showroom no logra conectar con Google Sheets, automáticamente cargará las 20 canciones estáticas oficiales que dejamos programadas por defecto. La web **nunca se romperá**.
* **¿Cuánto tarda en actualizarse la web?**
  Google Sheets suele tardar de **5 a 15 segundos** en propagar los cambios de sus servidores una vez que modificas una celda. Simplemente refresca la web del showroom y verás los cambios en vivo.

¡A disfrutar de tu Showroom Virtual autogestionable de por vida, Carlos! 🎙️🚀🔥
