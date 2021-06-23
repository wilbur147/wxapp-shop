<template>
	<view class="u-bg-gray">
		<!-- 导航栏 -->
		<u-navbar :is-back="false" :background="background">
			<view class="slot-wrap">
				<view class="u-flex-c">
					<image class="navbar-images" src="/static/shop/pdd_logo_1.png" mode="widthFix"></image>
					<image class="navbar-images" src="/static/shop/jd_logo_1.png"  mode="widthFix"></image>
					<image class="navbar-images" src="/static/shop/wph_logo_1.png" mode="widthFix"></image>
				</view>
				<view class="navbar-title">
					购物领券全场优惠
				</view>
			</view>
		</u-navbar>
		<!-- 搜索框 -->
		<u-search v-model="searchValue" placeholder="输入商品名称或粘贴标题" :clearabled="false" margin="30rpx 20rpx"
			:show-action="true" border-color="#feda2a" :disabled="true" @click="toSearch" height="86"
			:action-style="searchActionStyle" action-text="搜索优惠券" input-style="position: relative;">
		</u-search>
		<!-- 商品广告图 -->
		<view style="text-align: center;" v-if="adOne.src && adOne.src != ''">
			<image :src="adOne.src" @click="toPath(adOne.item)" mode="widthFix" class="ad-image"></image>
		</view>
		<view class="section"  v-if="features">
			<view class="section-bottom">
				<scroll-view class="scroll-view_X" scroll-x="true">
					<view v-for="(item, index) in features" :key="index" class="section-bottom-item">
						<image :src="item.src" @click="toPath(item)" mode="aspectFit"></image>
					</view>
				</scroll-view>
			</view>
		</view>

		<!-- 中部推销图 -->
		<view class="tx-wrap"  v-if="bigAdImges">
			<image :src="bigAdImges[0].src" @click="toPath(bigAdImges[0])" mode="widthFix"
				class="first-image"></image>
			<image :src="bigAdImges[1].src" @click="toPath(bigAdImges[1])" mode="widthFix"
				class="second-image"></image>
			<image :src="bigAdImges[2].src" @click="toPath(bigAdImges[2])" mode="widthFix"
				class="third-image"></image>
		</view>
		<!-- 商品广告图 -->
		<view style="text-align: center;"  v-if="adSecond.src && adSecond.src != ''">
			<image :src="adSecond.src" @click="toPath(adSecond.item)" mode="widthFix" class="ad-image"></image>
		</view>

		<!-- 分类商品分隔栏 -->
		<view class="sell-wrap">
			<u-row :gutter="100">
				<u-col :span="4">
					<view class="type-title" @click="switchCpType('pdd')">拼多多</view>
					<view class="type-desc" :class="{active: queryParams.cpType == 'pdd'}">精选宝贝</view>
				</u-col>
				<u-col :span="4">
					<view class="type-title" @click="switchCpType('jd')">京东</view>
					<view class="type-desc" :class="{active: queryParams.cpType == 'jd'}">件件必抢</view>
				</u-col>
				<u-col :span="4">
					<view class="type-title" @click="switchCpType('wph')">唯品会</view>
					<view class="type-desc" :class="{active: queryParams.cpType == 'wph'}">品牌特卖</view>
				</u-col>
			</u-row>
		</view>

		<!-- 商品信息列表 -->
		<view class="item-list">
		    <block v-if="list&&list.length">
				<view  @click="goDetail(item)" class="item-item" v-for="(item,index) in list" :key="index">
					<u-lazy-load class="item-thumbnail" :image="item.img" threshold="300"></u-lazy-load>
					<image class="item-shop-type" :src="shopTypeIcon"></image>
					<view class="item-title">{{item.goodsName}}</view>
					<view class="item-price-box">
					    <view class="item-price-prefix">￥</view>
					    <view class="item-price">{{numFilter(item.priceAfter)}}</view>
					</view>
					<view class="item-coupon-box" v-if="item.discount>0">
					    <image src="../../static/shop/img_coupon.png" style="width:100%;height:100%"></image>
					    <view class="item-coupon-prefix">券</view>
					    <view class="item-coupon-price">{{numFilter(item.discount)}}</view>
					</view>
					<view class="item-line"></view>
					<view class="item-price-origin">￥{{numFilter(item.price)}}</view>
					<view class="item-sale"  v-if="item.sales">已售{{item.sales || 0}}笔</view>
					<view class="item-money-earn" style="background-color: #FFE262;color: #2D2D2D;">领券下单</view>
				</view>
				<u-loadmore style="margin: auto;width: 100%;" :status="loadStatus" font-size="26" @loadmore="loadmore"/>
		    </block>
			<block v-else>
			    <u-empty style="margin: 30rpx auto;" text="数据为空" mode="data"></u-empty>
			</block>
		</view>
		<!-- 粘贴板 -->
		<u-popup v-model="clipboardShow" mode="center" closeable="true" border-radius="14" width="500rpx" height="400rpx" @close="hidClipboard">
			<view class="clipboard-content-box">
				<u-divider margin-bottom="40">是否搜索以下商品</u-divider>
				<view class="u-line-2" style="text-align: center;margin-bottom: 50rpx;min-height: 76rpx;">{{clipboardText}}</view>
				<u-button shape="circle" :custom-style="clipboardBtnCustomStyle" 
				:hair-line="false" :ripple="true" @click="clipboardToSearch">立即搜索</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {request} from "../../utils/request";
	var app = getApp();
	export default {
		data() {
			return {
				background: { backgroundColor: '#feda2a' },
				searchValue: "",
				searchActionStyle: {
					"position": "absolute",
					"right": "40rpx",
					"overflow": "visible",
					"width": "inherit",
					"line-height": "20rpx",
					"padding": "25rpx",
					"border-radius": "30rpx",
					"background-color": "#feda2a"
				},
				bigAdImges: [
					{
						src: '../../static/shop/o_1f2j4g85brqh8cl1jg916n2ung17.png',
						toType: 1,
						toPath: {
							page_path: 'pages/shop-list/shop-list',
							title: '新人特惠',
							jumpType: 'pdd',
							channelType: '1'
						}
					},
					{
						src: '../../static/shop/o_1f2j4gkvf1uuu14f01c9uids81n1c.png',
						toType: 1,
						toPath: {
							page_path: 'pages/shop-list/shop-list',
							title: '今日爆款',
							jumpType: 'pdd',
							channelType: '3'
						}
					},
					{
						src: '../../static/shop/o_1f2j4h3upn5b158ludf16bhqmp1h.png',
						toType: 1,
						toPath: {
							page_path: 'pages/shop-list/shop-list',
							title: '大额优惠',
							jumpType: 'pdd',
							channelType: '7'
						}
					},
				],
				features: [],
				adOne: null,
				adSecond: null,
				queryParams: {
					cpType: 'pdd',
					page: 1,
					pageSize: 10
				},
				loadStatus: 'loadmore',
				list: [],
				searchId: '',
				shopTypeIcon: '',
			    bottomHe: 0,
			    pageKey: "",
			    tabBar: [],
				clipboardShow: false,
				clipboardText: '',
				clipboardBtnCustomStyle: {
					marginTop: '20rpx', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					color: 'black',
					backgroundColor: '#fcd941',
					fontSize: '34rpx',
					borderColor: '#fcd941'
				}
			}
		},
		onLoad() {
			this.tabBar = wx.getStorageSync("tabbar");
			this.pageKey = wx.getStorageSync("pageKey");
			// 加载商城首页
			this.loadMallIndex();
			// 加载商品列表
			this.loadGoodsList();
			this.initShopTypeIcon();
			// 获取粘贴板内容
			this.getClipboardContent();
		},
		onReachBottom() {
			this.loadmore();
		},
		methods: {
			async loadMallIndex(){
				const result = await request({url: '/program/mall/mallIndex', method: 'GET'});
				if (result.code == 200) {
					this.adOne = result.data.adOne;
					this.features = result.data.features;
					this.adSecond = result.data.adSecond;
					this.bigAdImges = result.data.bigAdImges;
				}
			},
			async loadGoodsList(e){
				if (e) {uni.showLoading({title:"加载中..."})}
				const result = await request({url: '/program/mall/mallList'+this.$u.queryParams(this.queryParams), method: 'GET'});
				if (e) {uni.hideLoading();}
				if (result.code == 200) {
					this.searchId = result.data.searchId;
					this.list = [...this.list,...result.data.goodsList];
					if (this.list.length >= result.total) {
						this.loadStatus = 'nomore';
					}else{
						this.loadStatus = 'loadmore';
					}
				}else{
					this.loadGoodsList(true);
				}
			},
			change(t,s) {
				var a = this.tabBar.list[t];
				app.globalData = s.globalData;
				if (a.url.indexOf('index/index') != -1) {
					wx.redirectTo({
						url: "/pages/index/index"
					});
				}else if (a.url.indexOf('user/index') != -1) {
					wx.redirectTo({
						url: "/pages/user/index"
					});
				}else if (a.url.indexOf('meituan/index') != -1) {
					wx.redirectTo({
						url: "/pagesA/pages/meituan/index"
					});
				}else if (a.url.indexOf('elm/index') != -1) {
					wx.redirectTo({
						url: "/pagesA/pages/elm/index"
					});
				}
			},
			fatherHeight(t,ll) {
				this.bottomHe = ll;
		    },
			numFilter (value) {
				if (0 == value || '' == value || undefined == value) {
					return 0;
				}
				const fenStr = '00' + Number.parseInt(value.toString()).toString()
				return Number.parseFloat(fenStr.replace(/^(\d+?)(\d{2})$/g, '$1.$2'))
			},
			switchCpType(type){
				this.queryParams.cpType = type;
				
				this.queryParams.page = 1;
				this.list = [];
				this.initShopTypeIcon();
				this.loadGoodsList(true);
			},
			loadmore(){
				if(this.loadStatus == 'nomore') return;
				this.loadStatus = 'loading';
				this.queryParams.page = ++ this.queryParams.page;
				// 数据加载
				setTimeout(() => {
					this.loadGoodsList();
				}, 1000)
			},
			toSearch() {
				wx.navigateTo({
					url: '../HM-search/HM-search'
				})
			},
			goDetail(item){
				wx.navigateTo({
					url: '../shop-detail/shop-detail?goodsId='+item.goodsId+'&searchId='+this.searchId+'&cpType='+this.queryParams.cpType
				})
			},
			initShopTypeIcon(){
				switch(this.queryParams.cpType){
					case 'pdd':
					this.shopTypeIcon = '../../static/shop/pdd_logo.png';
					break;
					case 'jd':
					this.shopTypeIcon = '../../static/shop/jd_logo.ico';
					break;
					case 'wph':
					this.shopTypeIcon = '../../static/shop/wph_logo.png';
					break;
				}
			},
			toPath(e){
				// toType：0 不作任何动作  1 跳转商品列表  2 跳转其它小程序
				if (e.toType == 1) {
					wx.navigateTo({
						url: e.toPath.page_path+'?jumpType='+e.toPath.jumpType+'&title='+e.toPath.title+'&channelType='+e.toPath.channelType
					})
				}else if(e.toType == 2){
					wx.navigateToMiniProgram({
						appId: e.toPath.app_id,
						path: e.toPath.page_path,
						success(res) {
							// 打开成功
						}
					})
				}
			},
			getClipboardContent(){
				const _this = this;
				uni.getClipboardData({
				    success: function (res) {
						if (res && res.data) {
							_this.clipboardText = res.data;
							_this.clipboardShow = true;
						}
				    }
				});
			},
			hidClipboard(){
				this.clipboardShow = false;
				this.clipboardText = '';
			},
			clipboardToSearch(){
				this.clipboardShow = false;
				uni.navigateTo({
					url: '../shop-list/shop-list?keywords='+this.clipboardText+'&jumpType=search&title=搜索'
				})
				this.clipboardText = '';
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
	
	.slot-wrap{
		display: flex;
		.u-flex-c {
			padding-left: 22rpx;
			display: flex;
			flex: 5;
			justify-content: start;
			align-items: center;
			.navbar-images {
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
				border: 2rpx solid #FFFFFF;
			}
		}
		.navbar-title{
			font-size: 32rpx;
			font-weight: 700;
			display: flex;
			flex: 10;
			justify-content: start;
			align-items: center;
			padding-left: 12rpx;
		}
	}
	
	.clipboard-content-box{
		padding: 70rpx 50rpx 50rpx 50rpx;
	}
	
	.tx-wrap{
		position: relative;
		padding: 22rpx 18rpx;
		height: 427rpx;
		.first-image {
			position: absolute;
			left: 20rpx;
			top: 18rpx;
			width: 306rpx;
			height: 392rpx!important;
			border-top-left-radius: 20rpx;
			border-bottom-left-radius: 30rpx;
		}
		
		.second-image {
			width: 410rpx;
			height: 210rpx;
			position: absolute;
			top: 18rpx;
			right: 18rpx;
			border-top-right-radius: 20rpx;
		}
		
		.third-image {
			width: 410rpx;
			height: 210rpx;
			position: absolute;
			top: 214rpx;
			right: 18rpx;
			border-bottom-right-radius: 20rpx;
		}
	}
	
	
	.ad-image {
		border-radius: 30rpx;
		margin: 0rpx auto;
		width: 94%;
		height: 190rpx !important;
	}
	
	
	.section {
		width: 100vw;
		margin-top: 20rpx;
	
		.section-top {
			width: 100vw;
			display: flex;
			align-items: center;
			height: 60rpx;
	
			.section-text {
				font-size: 30rpx;
				font-weight: bold;
				margin-left: 20rpx;
			}
		}
	
		.section-bottom {
			width: 100vw;
			padding: 12rpx;
			text-align: center;
	
			.scroll-view_X {
				width: 100%;
				white-space: nowrap;
	
				.section-bottom-item {
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
						display: block;
						white-space: pre-line;
						margin: auto;
					}
				}
			}
		}
	}
	
	.sell-wrap {
		border-radius: 15rpx;
		background-color: #FFFFFF;
		width: 95%;
		height: 160rpx;
		margin: 20rpx auto;
	
		.type-title {
			font-size: 34rpx;
			font-weight: 600;
			margin-bottom: 15rpx;
			text-align: center;
			margin-top: 34rpx;
		}
	
		.type-desc {
			font-size: 22rpx;
			text-align: center;
			height: 40rpx;
			line-height: 40rpx;
			width: 140rpx;
			margin: auto;
			&.active {
				background-color: #feda2a;
				border-radius: 30rpx;
			}
		}
	
	}
	
	.item-list{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		.item-item {
		    width: 356rpx;
		    margin-left: 14rpx;
		    height: 646rpx;
		    border-radius: 12rpx;
		    background-color: #fff;
		    position: relative;
		    margin-top: 20rpx;
			.item-thumbnail {
			    width: 326rpx;
			    height: 326rpx;
			    border-radius: 10rpx;
			    position: absolute;
			    left: 14rpx;
			    top: 16rpx;
			}
			.item-shop-type {
			    width: 31rpx;
			    height: 31rpx;
			    top: 363rpx;
				position: absolute;
				left: 11rpx;
				border-radius: 8rpx;
			}
			.item-title {
				position: absolute;
				left: 11rpx;
			    text-indent: 36rpx;
			    top: 360rpx;
			    right: 30rpx;
			    font-size: 24rpx;
			    display: -webkit-box;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    word-wrap: break-word;
			    white-space: normal!important;
			    -webkit-line-clamp: 2;
			    -webkit-box-orient: vertical;
			}
			.item-price-box {
			    position: absolute;
			    left: 14rpx;
			    top: 436rpx;
			    display: flex;
			    align-items: baseline;
			    color: #f02038;
			    font-weight: 700;
				.item-price-prefix {
					font-size: 22rpx;
					margin-left: 2rpx;
					font-weight: lighter;
				}
				
				.item-price {
				    font-size: 42rpx;
				}
			}
			
			.item-coupon-box {
			    width: 96rpx;
			    height: 34rpx;
			    line-height: 34rpx;
			    position: absolute;
			    top: 450rpx;
			    right: 14rpx;
				.item-coupon-prefix {
				    width: 36rpx;
				    font-size: 20rpx;
				    color: #fff;
				    left: 0;
						height: 34rpx;
						line-height: 34rpx;
						text-align: center;
						position: absolute;
						top: 0;
				}
				.item-coupon-price {
				    height: 34rpx;
				    line-height: 34rpx;
				    text-align: center;
				    position: absolute;
				    top: 0;
						right: 0;
						width: 60rpx;
						color: #ff3624;
						font-size: 22rpx;
				}
			}
			.item-line {
			    position: absolute;
			    left: 14rpx;
			    right: 14rpx;
			    top: 508rpx;
			    height: 1rpx;
			    background: #e5e5e5;
			}
			.item-price-origin {
			    left: 14rpx;
			    text-decoration: line-through;
			}
			
			.item-price-origin,.item-sale {
			    font-size: 20rpx;
			    color: #a9a9a9;
			    font-weight: lighter;
			    position: absolute;
			    top: 526rpx;
			}
			.item-sale {
			    margin-left: 20rpx;
			    right: 14rpx;
			}
			.item-money-earn {
			    width: 320rpx;
			    height: 62rpx;
			    text-align: center;
			    line-height: 62rpx;
			    font-size: 26rpx;
			    color: #fff;
			    border-radius: 10rpx;
			    position: absolute;
			    left: 16rpx;
			    top: 568rpx;
			    font-weight: 700;
			}
		}
	}
</style>
