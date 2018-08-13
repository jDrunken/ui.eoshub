/* index.html을 build하기 위한 설정 */
module.exports = {
    // written out before index contents
    'prepend-to-output': () => `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <title>색인</title>
        </head>
        <body>
    `,
    // written out after index contents
    'append-to-output': () => `</body></html>`,
    
    // index page의 title은 어떤것으로?
    'title': 'eos hub 색인 페이지',
    
    // Title template function used to construct the title section
    'title-template': (title) =>`<h1 class="index__title">${title}</h1>
    `,
    // 어느 폴더부터 index 파일 생성에 필요한 정보를 찾을건지
    'relativePath': './src/',
    
    // 'relativePath'에서 몇 depth까지 root로 설정하고 싶은지
    'pathDepth': 1,
    
    // Section function used to construct each section identified using path depth
    'section-template': (sectionContent) => `<section class="index__section">
    ${sectionContent}</section>
    `,
    // Section heading function used to construct each section heading
    'section-heading-template': (heading) => `<h2 class="index__section-heading">${heading}</h2>
    `,
    // List function used to construct a file list
    'list-template': (listContent) => `<ul class="index__list">
    ${listContent}</ul>
    `,
    // Item function used to construct each list item
    'item-template': (filepath, filename) => `
        <li class="index__item">
            <a class="index__item-link" href="${filename}">${filename}</a>
        </li>
    `,
    // name of output file
    'outputFile': './index.html',
    // initial tab depth
    'tab-depth': 4,
    // tab string, default is two spaces
    'tab-string': '  '
};




