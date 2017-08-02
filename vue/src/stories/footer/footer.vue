<template>
    <footer>
        <div>
            <ul class="footer">
                <li>this site</li>
                <li>
                    <strong>About me</strong>
                    <p>a XiaoCaiB</p>
                    <strong>Find me</strong>
                    <p>
                        <img src="" alt="Github">
                        <img src="" alt="SF">
                        <img src="" alt="SO">
                        <img src="" alt="zhihu">
                    </p>
                </li>
                <li>
                    <strong>二维码？</strong>
                </li>
            </ul>
        </div>
        <div class="line"></div>
        <a href="http://www.miitbeian.gov.cn"><img src="./icon-police.png" alt="备案"> {{putOnRecord}}</a>
    </footer>
</template>
<style rel="stylesheet/less" lang="less">
    footer {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        width: 100%;
        min-height: 169px;
        background-color: #262626;
        color: white;
        > div {
            margin-bottom: 10px;
            :first-child { margin-top: 10px; }
        }
    }
    /**/

    /* 正文内部文本及图片 */
    ul.footer {
        list-style: none;
        li { padding: 0 10px; float: left; }
        p {
            color: grey;
            img { padding: 0 3px; }
        }
    }
    /**/

    /* 正文和备案分割线 */
    footer > .line { height: 1px; width: 90%; background: gray; }
    /**/

    /* 备案部分 */
    .normal-link { color: white; text-decoration: none; }
    footer {
        a, a:link, a:hover, a:visited { .normal-link }
        a { margin-bottom: 15px; }
    }
</style>
<script>
    export default {
        name: "footer",
        data(){
            return {
                putOnRecord: "鄂ICP备17003596号-1"
            }
        }
    };
</script>