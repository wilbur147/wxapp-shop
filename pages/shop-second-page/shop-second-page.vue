<template>
	<view>
		<!-- 顶部 -->
		<view class="top-wrap">
			<view class="title-wrap">
				<view class="item-image">
					<image v-if="queryParams.cpType == 'pdd'" src="../../static/shop/pdd_logo.png" mode="widthFix"></image>
					<image v-if="queryParams.cpType == 'jd'" src="../../static/shop/jd_logo_1.png" mode="widthFix"></image>
					<image v-if="queryParams.cpType == 'wph'" src="../../static/shop/wph_logo.png" mode="widthFix"></image>
				</view>
				<view class="item-text-wrap">
					<view class="text-top">{{title}}全网优惠</view>
					<view class="text-bottom">领券下单一年省千元</view>
				</view>
			</view>
			<!-- 搜索框 -->
			<u-search v-model="searchValue" placeholder="输入商品名称或粘贴标题" :clearabled="false" margin="30rpx 20rpx"
				:show-action="true" border-color="#feda2a" :disabled="true" @click="toSearch" height="86"
				:action-style="searchActionStyle" action-text="搜索优惠券" input-style="position: relative;">
			</u-search>
			<view class="step-wrap">
				<view class="num">1</view>
				<view class="text">领取大额优惠券</view>
				<view class="num">2</view>
				<view class="text">下单购物</view>
			</view>
		</view>
		<!-- 中部功能图 -->
		<view class="section"  v-if="features.length > 0">
			<view class="section-bottom">
				<scroll-view class="scroll-view_X" scroll-x="true">
					<view v-for="(item, index) in features" :key="index" class="section-bottom-item">
						<image :src="item.src" @click="toPath(item)" mode="aspectFit"></image>
						<view class="name" v-if="item.toPath&&item.toPath.title">{{item.toPath.title}}</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 分类 -->
		<view class="shop-type-box" style="width: 100%;background-color: #FFFFFF;">
			<u-tabs-swiper :list="shopTypeList"
			active-color="#ff6052" inactive-color="#757575" 
			font-size="26" :current="tabCurrent" gutter="50"
			bar-width="40" bar-height="4"
			@change="toSwitch"></u-tabs-swiper>
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
					<view class="item-money-earn" style="background-color: #feda2a;color: #2D2D2D;">领券下单</view>
				</view>
				<u-loadmore style="margin: auto;" :status="loadStatus" font-size="26" @loadmore="loadmore"/>
		    </block>
			<block v-else>
			    <u-empty style="margin: 30rpx auto;" text="数据为空" mode="data"></u-empty>
			</block>
		</view>
	</view>
</template>

<script>
	import {request} from "../../utils/request";
	export default {
		data() {
			return {
				title: '拼多多',
				searchValue: "",
				searchActionStyle: {
					"position": "absolute",
					"right": "40rpx",
					"overflow": "visible",
					"width": "inherit",
					"line-height": "20rpx",
					"padding": "25rpx",
					"border-radius": "30rpx",
					"background-color": "#feda2a",
					"color": "#59512c"
				},
				features: [],
				shopTypeList: [{name: '推荐', catId: 0}],
				tabCurrent: 0,
				queryParams: {
					cpType: 'pdd',
					page: 1,
					pageSize: 10,
					catId: 0
				},
				loadStatus: 'loadmore',
				list: [],
				searchId: '',
				shopTypeIcon: '',
			}
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
					title: e.title
			});
			this.title = e.title;
			this.queryParams.cpType = e.jumpType;
			// // 加载商城贴图列表
			this.loadMallTexture();
			// // 加载商城分类
			this.loadMallClass();
			// // 加载商品列表
			this.loadGoodsList();
			this.initShopTypeIcon();
		},
		onReachBottom() {
			this.loadmore();
		},
		methods: {
			async loadMallTexture(){
				const result = await request({url: '/program/mall/mallSecondIcon'+this.$u.queryParams(this.queryParams), method: 'GET'});
				if (result.code == 200) {
					if (result.code == 200) {
						this.features = result.data.features;
					}
				}
			},
			async loadMallClass(){
				const result = await request({url: '/program/mall/mallClass'+this.$u.queryParams(this.queryParams), method: 'GET'});
				if (result.code == 200) {
					this.shopTypeList = [...this.shopTypeList,...result.data];
				}
			},
			toSwitch(e){
				this.tabCurrent = e;
				this.queryParams.catId = this.shopTypeList[e].catId;
				this.clickList();
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
			clickList(){
				this.queryParams.page = 1;
				this.list = [];
				this.loadGoodsList(true);
			},
			numFilter (value) {
				if (0 == value || '' == value || undefined == value) {
					return 0;
				}
				const fenStr = '00' + Number.parseInt(value.toString()).toString()
				return Number.parseFloat(fenStr.replace(/^(\d+?)(\d{2})$/g, '$1.$2'))
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
			}
		}
	}
	
</script>
<style lang="scss" scoped>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: #f6f6f6;
	}
	.top-wrap{
		height: 330rpx;
		width: 100%;
		background-color: #feda2a;
		.title-wrap{
			width: 100%;
			height: 120rpx;
			display: flex;
			.item-image{
				flex: 4.5;
				text-align: right;
				margin-top: 20rpx;
				image{
					border-radius: 20rpx;
					width: 90rpx;
					height: 90rpx;
					background-color: #ffffff;
				}
			
			}
			.item-text-wrap{
				flex: 7.5;
				margin-left: 15rpx;
				margin-top: 20rpx;
				.text-top{
					font-size: 38rpx;
					font-weight: 700;
				}
				.text-bottom{
					font-size: 24rpx;
					font-weight: 400;
					margin-top: 5rpx;
				}
			}
		}
		
		.step-wrap{
			display: flex;
			flex-wrap: wrap;
			padding-left: 25rpx;
			.num{
				width: 32rpx;
				height: 32rpx;
				background-color: #ffefa1;
				text-align: center;
				border-radius: 50%;
				font-size: 22rpx;
			}
			.text{
				font-size: 24rpx;
				font-weight: 400;
				margin-right: 40rpx;
				color: #59512c;
			}
		}
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
					
					.name{
						font-size: 24rpx;
						color: #59512c;
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
	
	.item-list{
		width: 100%;
		min-height: 280px;
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
