# ClapMe OTTzinha

<img src="https://clapme.com/assets/clapme-logo-6e9f92c6fb2feba86ea49f94061e4966ab7467e6b1c3485721d9b40e379472d6.png" style="width:500px;" />

<br />
<br />

### O arquivo `styledguide.json` serve para preencher todas as variáveis de Styleguide da plataforma.

**Obs.: Não mude o nome das chaves, somente os valores. Ex.:**
  _BASE_
  ```json
    {
      "primary": "#000"
    }
  ```

  _BOM_
  ```json
    {
      "primary": "#ccc"
    }
  ```
  == MAU ==
  ```json
    {
      "cinza-claro": "#ccc"
    }
  ```


## Variáveis
_Use o checkbox para marcar as variáveis adicionadas, ajuda a se guiar na construção do arquivo._
### Cores (_colors_)

[ ] primary-c - Backgrounds dos botões, filtro nas fotos, links ativos. <br />
[ ] text-c - Textos que não utilizam a cor primária.<br />
[ ] solid-c - Background sólido no banner, background da navbar, background do footer.<br />
[ ] solid-text-c - Textos que vão aparecer por cima de um bloco que tem `solid` como background.<br />
[ ] body-c - Background do body.<br />

### Fontes (_fonts_)

_Lembre-se de importar a fonte no arquivo_ `src/app/styles/global.styles.css`
_Para fontes locais, adicione em_ `public/font` _e importe como font-face no arquivo_ `src/app/styles/global.styles.css`.

**family** <br />
  [ ] title-f - Fonte para os títulos<br />
  [ ] text-f - Fonte para texto que não são títulos<br />
  [ ] button-f - Fonte para botões<br />

### Títulos (_type_)

[ ] banner - Texto do banner da Home.<br />
[ ] login - Texto do banner em Login.<br />

---
## Imagens

_Adicione as imagens na pasta_ `public/font`

_Coloque as imagens com o nome indicado abaixo:_

[ ] logo - Arquivo usado para a logo na navbar, footer, login, etc.<br />
[ ] banner - Arquivo usado para a foto do banner na Home.<br />
[ ] login - Arquivo usado para a tela de login.<br />

### Favicon

_Adicione o arquivo_ `favicon.ico` _na pasta_ `public/`
