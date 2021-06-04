const baseUrl = 'http://localhost:6001'
export const request = (params) => {
	// 判断路径包含前缀没有，包含了就用原始路径
	let urlflag = false;
	if (params.url.indexOf('http') > -1) {
		urlflag = true;
	}

	return new Promise((resolve, reject) => {
		uni.request({
			...params,
			url: urlflag ? params.url : baseUrl + params.url,
			success: res => {
				resolve(res.data);
			},
			fail: (err) => {
				uni.showToast({
					title: '请求接口失败'
				});
				reject(err);
			},
			complete: () => {
				uni.hideLoading();
			}
		});
	})
}
