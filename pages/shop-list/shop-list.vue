<template>
	<view class="u-bg-gray">
		<!-- 搜索框 -->
		<u-search v-model="searchValue" placeholder="输入宝贝关键字" :clearabled="true" margin="30rpx 20rpx"
			 @click="toSearch">
		</u-search>
	</view>
</template>


<script src="./shop-list.js"></script>
<style>
	/* page不能写带scope的style标签中，否则无效 */
	/* page {
		background-color: rgb(240, 240, 240);
	} */
</style>
<style lang="scss" scoped src="./shop-list.scss"></style>
