<template>
  <div class="topbar">
    <a href=":;" class="title">ANK</a>
    <ul class="nav-menu">
      <li>
        <a href="/m/cn">主页</a>
      </li>
      <li>
        <a href="/m/cn/pawn" class="active">典当</a>
      </li>
      <li>
        <a href="/m/cn/qa">问答</a>
      </li>
      <li>
        <a href="/m/cn/team">团队</a>
      </li>
      <li class="language" id='language'>
        <a href="javascript:;">中文</a>
        <ul class="language-list clear" id="languageList">
          <li class="language-item">
            <a href="/m/cn">中文</a>
          </li>
          <li class="language-item">
            <a href="/m">English</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
	name: 'topbar'
};
</script>
