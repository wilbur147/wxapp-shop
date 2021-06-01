<template>
	<view class="u-bg-gray">
		<!-- 导航栏 -->
		<u-navbar :is-back="false" title="测试导航栏" :background="background">
			<view class="slot-wrap u-flex-wrap">
				<view class="u-flex-c">
					<image class="navbar-images" src="../../static/center-selected.png" mode="widthFix"></image>
					<image class="navbar-images" src="../../static/center-selected.png" mode="widthFix"></image>
					<image class="navbar-images" src="../../static/center-selected.png" mode="widthFix"></image>
				</view>
			</view>
		</u-navbar>
		<!-- 搜索框 -->
		<u-search v-model="searchValue" placeholder="输入商品名称或粘贴标题" :clearabled="false"
		margin="30rpx 20rpx" :show-action="true" border-color="#FA3534"
		:disabled="true" @click ="toSearch"
		:action-style="searchActionStyle" action-text="搜索优惠券"
		input-style="position: relative;"
		>
		</u-search>
		
		<view class="section">
		  <view class="section-bottom">
				<scroll-view class="scroll-view_X" scroll-x="true">
					<!-- <view v-for="(item, index) in otherMiniPrograms" :key="index" class="section-bottom-item" @tap="toOtherMiniPrograms" :data-index="index">
						<image :src="item.icon" mode="aspectFit"></image>
						<text>{{item.name}}</text>
					</view>					 -->	
					<u-row :gutter="60">
						<u-col :span="3">
							<u-avatar src="https://www.uviewui.com/customer/sdf1516355we0sd2.jpg"></u-avatar>
						</u-col>
						<u-col :span="3">
							<u-avatar src="https://www.uviewui.com/customer/sdf1516355we0sd2.jpg"></u-avatar>
						</u-col>
						<u-col :span="3">
							<u-avatar src="https://www.uviewui.com/customer/sdf1516355we0sd2.jpg"></u-avatar>
						</u-col>
						<u-col :span="3">
							<u-avatar src="https://www.uviewui.com/customer/sdf1516355we0sd2.jpg"></u-avatar>
						</u-col>
					</u-row>
				</scroll-view>
		  </view>
		</view>
		
		<!-- 中部推销图 -->
		<view class="wrap">
			<u-row>
				<u-col span="6">
					<image src="https://www.uviewui.com/customer/sdf1516355we0sd2.jpg" mode="widthFix" class="first-image"></image>
				</u-col>
				<u-col span="6">
					<u-row>
						<image src="https://www.uviewui.com/customer/sdf1516355we0sd2.jpg" mode="widthFix" class="second-image"></image>
					</u-row>
					<u-row>
						<u-line class="u-line" length="300rpx"></u-line>
						<image src="https://www.uviewui.com/customer/sdf1516355we0sd2.jpg" mode="widthFix" class="third-image"></image>
					</u-row>
				</u-col>
			</u-row>
		</view>
		<!-- 商品广告图 -->
		<view style="text-align: center;">
			<image src="https://www.uviewui.com/customer/sdf1516355we0sd2.jpg" mode="widthFix" class="ad-image"></image>
		</view>
		
		<!-- 分类商品分隔栏 -->
		<view class="sell-wrap">
			<u-row :gutter="100">
				<u-col :span="4">
					<view class="type-title">拼多多</view>
					<view class="type-desc type-active">精选宝贝</view>
				</u-col>
				<u-col :span="4" >
					<view class="type-title">京东</view>
					<view class="type-desc">件件必抢</view>
				</u-col>
				<u-col :span="4" >
					<view class="type-title">唯品会</view>
					<view class="type-desc">品牌特卖</view>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					// backgroundColor: '#001f3f',
					
					// 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					// backgroundSize: 'cover',
					
					// 渐变色
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				searchValue: "",
				searchActionStyle: {
					"position":"absolute",
					"right":"40rpx",
					"overflow": "visible",
					"width": "inherit",
					"line-height": "5rpx",
					"padding": "25rpx",
					"border-radius": "30rpx",
					"background-color": "#ff9900"
				},
			}
		},
		methods: {
			toSearch(){
				console.log("触发搜索点击");
			}
		}
	}
</script>

<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
</style>

<style lang="scss" scoped>
	.navbar-images{
		width: 70rpx;
	}
	.navbar-title{
		font-size: 30rpx;
	}
	.ad-image{
		border-radius: 90rpx;
		margin: 15rpx auto;
		width: 94%;
		height: 160rpx!important;
	}
	
	.first-image{
		width: 360rpx!important;
		height: 300rpx!important;
	}
	.second-image{
		width: 360rpx;
		height: 145rpx!important;
		margin-bottom: 3rpx;
	}
	.third-image{
		margin-top: 3rpx;
		width: 360rpx;
		height: 145rpx!important;
	}
	
	.section{
		width: 100vw;
		background-color: white;
		margin-top: 20rpx;
		.section-top{
			width: 100vw;
			display: flex;
			align-items: center;
			height: 60rpx;
			.section-text{
				font-size: 30rpx;
				font-weight: bold;
				margin-left: 20rpx;
			}
		}
		
		.section-bottom{
			width: 100vw;
			padding: 30rpx;
			.scroll-view_X{
				width: 100%;
				white-space: nowrap;
				.section-bottom-item{
					width: 25%;
					display: inline-block;
					image {
					  width: 15vw;
					  height: 15vw;
					  margin: auto;
					}
					text {
					  color: #707070;
					  font-size: 24rpx;
					  text-align: center;
					  width: 20vw;
					  display:block;
					  white-space: pre-line;
					  margin: auto;
					}
				}
			}
		}
	}
	
	.sell-wrap{
		border-radius: 15rpx;
		background-color: #FFFFFF;
		width: 95%;
		height: 300rpx;
		margin: 20rpx auto;
		.type-title{
			font-size: 34rpx;
			font-weight: 600;
			margin-bottom: 15rpx;
			text-align: center;
		}
		
		.type-desc{
			font-size: 22rpx;
			text-align: center;
			height: 40rpx;
			line-height: 40rpx;
			width: 140rpx;
			margin: auto;
		}
		
		.type-active{
			background-color: #F29100;
			border-radius: 30rpx;
		}
	}
</style>
