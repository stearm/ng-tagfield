(function() {
	'use strict';

	angular
		.module('app', [])
		.directive('tagField', tagField);

	function tagField() {
		return {
			scope: {
				tags: '=',
				checkId : '@',
			},
			template: '<label for="tagsfield" class="col-sm-2 control-label">Tags</label><div class="col-sm-6"><input id="{{checkId}}" type="text" class="form-control" ng-model="tagText" ng-keydown="processaInputTag(tagText,$event)"></input><span class="label-tag label label-primary" ng-repeat="tag in tags track by $index">{{tag}}</span></div>',
			link: function(scope, element, attrs) {

				var setCss = function() {
					var tagList = angular.element(document)[0].getElementsByClassName("label-tag");
					var lastInsertedTag = tagList[tagList.length - 1];
					angular.element(lastInsertedTag).css({
						"visibility": "hidden"
					});

					angular.element(document).ready(function() {
						var tags = angular.element(document)[0].getElementsByClassName("label-tag");
						var marginLeft = 12;
						for (var i = 0; i < tags.length; i++) {
							var tag = angular.element(tags[i]);
							tag.css({
								"top": "10px",
								"margin-left": marginLeft + "px"
							});
							marginLeft += (tags[i].offsetWidth + 2);
							tag.css({
								"visibility": "visible"
							});
						}
						var inputField = element.find("input")[0];
						inputField = angular.element(inputField);
						inputField.css({
							"padding-left": marginLeft + "px"
						});
					});
				};

				scope.processaInputTag = function(tagText, event) {
					if (event.which == 188) {
						event.preventDefault()
						var newTag = tagText;
						scope.tagText = "";

						scope.tags.push(newTag);

					} else if (event.which == 8) {
						// if there isn't text but only tag -> remove the last tag from the array
						if (tagText == null || tagText == "") {
							scope.tags.pop();
						}
					}
				};

				scope.$watchCollection('tags', function(oldVal, newVal) {
					if (newVal) {
						setCss();
					}
				});
			}
		};
	}
})();