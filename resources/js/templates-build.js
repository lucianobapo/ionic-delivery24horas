angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("account/template/tab-account.html","<ion-view view-title=\"Account\">\n  <ion-content>\n    <ion-list>\n    <ion-toggle  ng-model=\"settings.enableFriends\">\n        Enable Friends\n    </ion-toggle>\n    </ion-list>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("cart/templates/cart.html","<ion-modal-view>\n    <ion-header-bar>\n        <h1 class=\"title\">Carrinho de Compras</h1>\n\n        <div class=\"buttons\">\n            <button class=\"button button-clear\" ng-click=\"closeCart()\">Fechar</button>\n        </div>\n    </ion-header-bar>\n    <ion-content>\n        <div class=\"text-center\" ng-hide=\"valorTotal>0\">\n            <button class=\"button button-large button-full button-dark\" ng-click=\"closeCart()\">\n                Nenhum item selecionado\n            </button>\n        </div>\n\n        <div class=\"list list-inset\" ng-show=\"valorTotal>0\">\n            <div class=\"item item-divider\">Itens</div>\n            <div class=\"item item-button-right\" ng-repeat=\"item in cartItems\">\n                <p>{{ item.nome }}</p>\n                <span class=\"quantity\">{{ item.quantidade }} <small>x</small> </span><span class=\"price\">{{ item.valor | currency }}</span>\n                <button class=\"button button-light\" ng-click=\"removeCartItem(item.id)\">\n                    <i class=\"icon ion-close-circled\"></i>\n                </button>\n            </div>\n        </div>\n\n        <form class=\"cancelEnter\" ng-submit=\"doDelivery()\" ng-show=\"valorTotal>0\">\n            <div class=\"list\">\n                <div class=\"item item-divider\">Forma de Pagamento</div>\n\n                <div class=\"item text-center\">\n                    Valor Total: <span class=\"price\">{{ valorTotal | currency }}</span>\n                    <ion-list class=\"text-left\">\n                        <ion-radio ng-model=\"cartData.pagamento\" ng-value=\"\'dinheiro\'\">Dinheiro</ion-radio>\n                        <ion-radio ng-model=\"cartData.pagamento\" ng-value=\"\'debito\'\">\n                            <div class=\"pull-left\">Cartão Debito</div>\n                            <div class=\"pull-right\">\n                                <i class=\"fa fa-cc-visa fa-2x\"></i>\n                                <i class=\"fa fa-cc-mastercard fa-2x\"></i>\n                                <i class=\"fa fa-cc-diners-club fa-2x\"></i>\n                            </div>\n\n                        </ion-radio>\n                        <ion-radio ng-model=\"cartData.pagamento\" ng-value=\"\'credito\'\">\n                            <div class=\"pull-left\">Cartão Crédito</div>\n                            <div class=\"pull-right\">\n                                <i class=\"fa fa-cc-visa fa-2x\"></i>\n                                <i class=\"fa fa-cc-mastercard fa-2x\"></i>\n                                <i class=\"fa fa-cc-diners-club fa-2x\"></i>\n                            </div>\n                        </ion-radio>\n                    </ion-list>\n                </div>\n                <div class=\"item\">\n\n                </div>\n\n                <div class=\"item item-divider\">Dados da Entrega</div>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Nome:</span>\n                    <input type=\"text\" name=\"nome\" ng-model=\"cartData.nome\" placeholder=\"Ex.: João da Silva\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">E-mail:</span>\n                    <input type=\"email\" name=\"email\" ng-model=\"cartData.email\" placeholder=\"Ex.: exemplo@gmail.com\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Telefone:</span>\n                    <input type=\"tel\" name=\"telefone\" ng-model=\"cartData.telefone\" placeholder=\"Ex.: (22)999 999 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Whatsapp:</span>\n                    <input type=\"tel\" name=\"whatsapp\" ng-model=\"cartData.whatsapp\" placeholder=\"Ex.: (22)999 999 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">CEP:</span>\n                    <input type=\"tel\"\n                           class=\"numbersOnly cancelEnter cepKeyUp\"\n                           autocomplete=\"off\"\n                           ng-model=\"cartData.cep\" placeholder=\"Ex.: 28893818\"\n                           maxlength=\"8\">\n                </label>\n                <label class=\"item item-input item-stacked-label item-button-right\">\n                    <span class=\"input-label\">Endereço:</span>\n                    <input type=\"text\"\n                           class=\"cancelEnter enderecoKeyUp\"\n                           autocomplete=\"off\"\n                           ng-model=\"cartData.endereco\" placeholder=\"Ex.: Av. Brasil\">\n                    <div class=\"list list-inset\" ng-show=\"cartData.matches.length>0\">\n                        <div class=\"item item-divider\">Endereços encontrados:</div>\n                        <label class=\"item address-item\" ng-repeat=\"address in cartData.matches\">\n                            <button class=\"button button-small button-light\" type=\"button\"\n                                    ng-click=\"selecionaEndereco(address)\">\n                                {{address.logradouro}} {{address.complemento}} - CEP: {{address.cep}} - Bairro: {{address.bairro}}\n                            </button>\n                        </label>\n                    </div>\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Bairro:</span>\n                    <input type=\"text\" name=\"bairro\" ng-model=\"cartData.bairro\" placeholder=\"Ex.: Centro\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Número:</span>\n                    <input type=\"text\" name=\"numero\" ng-model=\"cartData.numero\" placeholder=\"Ex.: 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Complemento: <small>(opcional)</small></span>\n                    <input type=\"text\" name=\"complemento\" ng-model=\"cartData.complemento\" placeholder=\"Ex.: apartamento 109\">\n                </label>\n\n                <label class=\"item\">\n                    <button class=\"button button-block button-positive\" type=\"submit\">Solicitar Entrega</button>\n                </label>\n            </div>\n        </form>\n    </ion-content>\n</ion-modal-view>\n");
$templateCache.put("chat/template/chat-detail.html","<!--\n  This template loads for the \'tab.friend-detail\' state (app.js)\n  \'friend\' is a $scope variable created in the FriendsCtrl controller (controllers.js)\n  The FriendsCtrl pulls data from the Friends service (service.js)\n  The Friends service returns an array of friend data\n-->\n<ion-view view-title=\"{{chat.name}}\">\n  <ion-content class=\"padding\">\n    <img ng-src=\"{{chat.face}}\" style=\"width: 64px; height: 64px\">\n    <p>\n      {{chat.lastText}}\n    </p>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("chat/template/tab-chats.html","<ion-view view-title=\"Chats\">\n  <ion-content>\n    <ion-list>\n      <ion-item class=\"item-remove-animate item-avatar item-icon-right\" ng-repeat=\"chat in chats\" type=\"item-text-wrap\" href=\"#/tab/chats/{{chat.id}}\">\n        <img ng-src=\"{{chat.face}}\">\n        <h2>{{chat.name}}</h2>\n        <p>{{chat.lastText}}</p>\n        <i class=\"icon ion-chevron-right icon-accessory\"></i>\n\n        <ion-option-button class=\"button-assertive\" ng-click=\"remove(chat)\">\n          Delete\n        </ion-option-button>\n      </ion-item>\n    </ion-list>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("common/templates/menu.html","<ion-side-menus enable-menu-with-back-views=\"false\">\n    <ion-side-menu-content>\n        <ion-nav-bar class=\"bar-stable\">\n            <ion-nav-back-button></ion-nav-back-button>\n            <ion-nav-buttons side=\"left\">\n                <button class=\"button button-icon button-clear ion-navicon\" menu-toggle=\"left\"\n                        ng-hide=\"$exposeAside.active\"></button>\n                <div class=\"delivery-bar-title title\">delivery24horas.com</div>\n            </ion-nav-buttons>\n            <ion-nav-buttons side=\"right\">\n                <button class=\"delivery-btn-social-header button button-positive btn-social\">\n                    <i class=\"ion-social-facebook\"></i>Login com Facebook\n                </button>\n\n                <!--<button class=\"button marging\" ng-class=\"{\'button-clear\': (valorTotal=0), \'button-balanced\': (valorTotal>0)}\">-->\n                <button class=\"button marging\"\n                        ng-click=\"showCart()\"\n                        ng-class=\"(valorTotal>0)?\'button-clear button-balanced\': \'button-clear\'\">\n                <!--<button class=\"button button-clear\">-->\n                    <i class=\"ion-android-cart\"></i> ({{ valorTotal | currency }})\n                </button>\n            </ion-nav-buttons>\n        </ion-nav-bar>\n        <ion-nav-view name=\"menuContent\"></ion-nav-view>\n    </ion-side-menu-content>\n\n    <ion-side-menu expose-aside-when=\"large\">\n        <ion-header-bar class=\"bar-stable\">\n            <h1 class=\"title\">Menu</h1>\n        </ion-header-bar>\n        <ion-content>\n            <ion-refresher pulling-text=\"Deslize para Atualizar\" on-refresh=\"doRefresh()\"></ion-refresher>\n            <div class=\"list list-inset\">\n                <div class=\"item item-divider\">Categorias</div>\n\n                <a href=\"#/app/productlist\" class=\"item item-icon-left\"\n                   menu-close ng-click=\"loadCategoria(\'Todas\');loadProducts()\">\n                    <i class=\"icon ion-beer\"></i>\n                    Todas\n                </a>\n                <a ng-repeat=\"item in categorias\" href=\"#/app/productlist\" class=\"item item-icon-left\"\n                   menu-close ng-click=\"loadCategoria(item.nome);loadProducts(item.id)\">\n                    <i class=\"{{ item.icon }}\"></i>\n                    {{ item.nome }}\n                </a>\n\n                <div class=\"item item-divider\">Relatórios</div>\n                <a href=\"#/app/report\" class=\"item item-icon-left\" menu-close>\n                    <i class=\"ion-document-text\"></i>\n                    Relatórios\n                </a>\n                <a href=\"#/app/browse\" class=\"item item-icon-left\" menu-close>\n                    <i class=\"ion-document-text\"></i>\n                    Browse\n                </a>\n\n                <div class=\"item item-divider\">Minha conta</div>\n                <div class=\"item\">Meus Dados</div>\n                <div class=\"item\">Trocar Senha</div>\n                <div class=\"item\">Sair</div>\n\n            </div>\n        </ion-content>\n    </ion-side-menu>\n</ion-side-menus>");
$templateCache.put("productlist/templates/productlist.html","<ion-view view-title=\"\">\n    <div class=\"bar item-input-inset\" ng-class=\"{\'bar-subheader\': minMediumScreens}\">\n        <label class=\"item-input-wrapper\">\n            <i class=\"icon ion-ios-search placeholder-icon\"></i>\n            <input type=\"search\" placeholder=\"Busca de produtos\" ng-model=\"query\">\n        </label>\n        <button class=\"button button-clear\" ng-click=\"query = \'\'\">\n            Cancelar\n        </button>\n    </div>\n    <ion-content ng-class=\"{\'has-subheader\': minMediumScreens, \'has-header\': handhelds}\"\n                 set-class-when-at-top=\"fix-to-top\" overflow-scroll=\"false\">\n        <ion-refresher pulling-text=\"Deslize para Atualizar\" on-refresh=\"doRefresh()\"></ion-refresher>\n\n        <div class=\"list delivery-list\">\n\n            <div class=\"item item-button-right delivery-btn-social\">\n                <button class=\"button button-positive btn-social\">\n                    <i class=\"ion-social-facebook\"></i>Login com Facebook\n                </button>\n            </div>\n            <div class=\"item\" ng-show=\"minMediumScreens\">\n                <div class=\"delivery-logo-block\">\n                    <img ng-src=\"{{logoUrl+\'logo-delivery2-resized-compressed.png\'}}\">\n                    <p ng-hide=\"$exposeAside.active\"><span class=\"ion-arrow-left-a\"></span> Acesse o Menu ao lado</p>\n                </div>\n            </div>\n\n        </div>\n\n        <div class=\"delivery-list-with-menu\">\n            <div affix-within-container=\".delivery-list-with-menu\" class=\"delivery-menu-left\">\n                <!--<button ng-click=\"loadCategoria(\'Todas\');loadProducts()\"-->\n                        <!--class=\"delivery-button button button-outline button-positive\">-->\n                    <!--<i class=\"{{ item.icon }}\"></i>-->\n                    <!--<p>Todas</p>-->\n                <!--</button>-->\n                <!--<div ion-affix data-affix-within-parent-with-class=\"delivery-menu-left\"-->\n                <button ng-repeat=\"item in categorias\" ng-click=\"loadCategoria(item.nome);loadProducts(item.id)\"\n                        class=\"delivery-button button button-outline button-positive\">\n                    <i class=\"{{ item.icon }}\"></i>\n                    <p>{{ item.nome }}</p>\n                </button>\n            </div>\n\n            <div ng-class=\"{card: minMediumScreens, list: handhelds, \'list-inset\': handhelds}\">\n                <div class=\"item item-divider\">{{ rootCategoriaSelecionada }}</div>\n                <div class=\"delivery-product-item\" ng-class=\"{item: handhelds, \'item-thumbnail-left\': handhelds}\"\n                     ng-repeat=\"produto in products | filter: query\">\n\n                    <img ng-src=\"{{ prepareImage(produto.imagem) }}\"\n                         alt=\"Imagem do produto {{ produto.nome }}\"\n                         title=\"Imagem do produto {{ produto.nome }}\">\n                    <div>\n                        <span class=\"price\">{{ produto.valor | currency }}<small ng-show=\"quantidade[produto.id]>0\"> x <span class=\"quantity\">{{ quantidade[produto.id] }}</span></small></span>\n                        <p>{{ produto.nome }}</p>\n                    </div>\n\n                    <div class=\"range\">\n                        <button ng-click=\"decrementa(produto.id)\" class=\"button button-light\"><i class=\"icon ion-chevron-left\"></i></button>\n                        <input type=\"range\" ng-change=\"somaTotal()\" id=\"quantidade[{{ produto.id }}]\"\n                               name=\"quantidade[{{ produto.id }}]\" ng-model=\"quantidade[produto.id]\"\n                               min=\"0\" max=\"{{ produto.max }}\">\n                        <button ng-click=\"incrementa(produto.id)\" class=\"button button-light\"><i class=\"icon ion-chevron-right\"></i></button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n    </ion-content>\n</ion-view>");
$templateCache.put("report/templates/report.html","<ion-view view-title=\"Relatórios\">\n    <ion-content class=\"padding\">\n        <h1>{{ titulo }}</h1>\n        <p>\n            <a class=\"button icon icon-right ion-chevron-right\" href=\"#/app/report\">titulo</a>\n        </p>\n    </ion-content>\n</ion-view>");
$templateCache.put("browse.html","<ion-view view-title=\"Browse\">\n  <ion-content>\n    <h1>Browse</h1>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("loading.html","<div class=\"loading-container visible active\">\n    <div class=\"loading\">\n        <p>Carregando...</p><ion-spinner></ion-spinner>\n    </div>\n</div>");
$templateCache.put("login.html","<ion-modal-view>\n  <ion-header-bar>\n    <h1 class=\"title\">Login</h1>\n    <div class=\"buttons\">\n      <button class=\"button button-clear\" ng-click=\"closeLogin()\">Close</button>\n    </div>\n  </ion-header-bar>\n  <ion-content>\n    <form ng-submit=\"doLogin()\">\n      <div class=\"list\">\n        <label class=\"item item-input\">\n          <span class=\"input-label\">Username</span>\n          <input type=\"text\" ng-model=\"loginData.username\">\n        </label>\n        <label class=\"item item-input\">\n          <span class=\"input-label\">Password</span>\n          <input type=\"password\" ng-model=\"loginData.password\">\n        </label>\n        <label class=\"item\">\n          <button class=\"button button-block button-positive\" type=\"submit\">Log in</button>\n        </label>\n      </div>\n    </form>\n  </ion-content>\n</ion-modal-view>\n");
$templateCache.put("search.html","<ion-view view-title=\"Search\">\n  <ion-content>\n    <h1>Search</h1>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("tabs/tab-cart.html","<ion-view>\n    <ion-header-bar>\n        <h1 class=\"title\">Carrinho de Compras</h1>\n\n        <div class=\"buttons\">\n            <button class=\"button button-clear\" ng-click=\"closeCart()\">Fechar</button>\n        </div>\n    </ion-header-bar>\n    <ion-content>\n        <div class=\"text-center\" ng-hide=\"valorTotal>0\">\n            <button class=\"button button-large button-full button-dark\" ng-click=\"closeCart()\">\n                Nenhum item selecionado\n            </button>\n        </div>\n\n        <div class=\"list list-inset\" ng-show=\"valorTotal>0\">\n            <div class=\"item item-divider\">Itens</div>\n            <div class=\"item item-button-right\" ng-repeat=\"item in cartItems\">\n                <p>{{ item.nome }}</p>\n                <span class=\"quantity\">{{ item.quantidade }} <small>x</small> </span><span class=\"price\">{{ item.valor | currency }}</span>\n                <button class=\"button button-light\" ng-click=\"removeCartItem(item.id)\">\n                    <i class=\"icon ion-close-circled\"></i>\n                </button>\n            </div>\n        </div>\n\n        <form class=\"cancelEnter\" ng-submit=\"doDelivery()\" ng-show=\"valorTotal>0\">\n            <div class=\"list\">\n                <div class=\"item item-divider\">Forma de Pagamento</div>\n\n                <div class=\"item text-center\">\n                    Valor Total: <span class=\"price\">{{ valorTotal | currency }}</span>\n                    <ion-list class=\"text-left\">\n                        <ion-radio ng-model=\"cartData.pagamento\" ng-value=\"\'dinheiro\'\">Dinheiro</ion-radio>\n                        <ion-radio ng-model=\"cartData.pagamento\" ng-value=\"\'debito\'\">\n                            <div class=\"pull-left\">Cartão Debito</div>\n                            <div class=\"pull-right\">\n                                <i class=\"fa fa-cc-visa fa-2x\"></i>\n                                <i class=\"fa fa-cc-mastercard fa-2x\"></i>\n                                <i class=\"fa fa-cc-diners-club fa-2x\"></i>\n                            </div>\n\n                        </ion-radio>\n                        <ion-radio ng-model=\"cartData.pagamento\" ng-value=\"\'credito\'\">\n                            <div class=\"pull-left\">Cartão Crédito</div>\n                            <div class=\"pull-right\">\n                                <i class=\"fa fa-cc-visa fa-2x\"></i>\n                                <i class=\"fa fa-cc-mastercard fa-2x\"></i>\n                                <i class=\"fa fa-cc-diners-club fa-2x\"></i>\n                            </div>\n                        </ion-radio>\n                    </ion-list>\n                </div>\n                <div class=\"item\">\n\n                </div>\n\n                <div class=\"item item-divider\">Dados da Entrega</div>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Nome:</span>\n                    <input type=\"text\" name=\"nome\" ng-model=\"cartData.nome\" placeholder=\"Ex.: João da Silva\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">E-mail:</span>\n                    <input type=\"email\" name=\"email\" ng-model=\"cartData.email\" placeholder=\"Ex.: exemplo@gmail.com\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Telefone:</span>\n                    <input type=\"tel\" name=\"telefone\" ng-model=\"cartData.telefone\" placeholder=\"Ex.: (22)999 999 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Whatsapp:</span>\n                    <input type=\"tel\" name=\"whatsapp\" ng-model=\"cartData.whatsapp\" placeholder=\"Ex.: (22)999 999 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">CEP:</span>\n                    <input type=\"tel\"\n                           class=\"numbersOnly cancelEnter cepKeyUp\"\n                           autocomplete=\"off\"\n                           ng-model=\"cartData.cep\" placeholder=\"Ex.: 28893818\"\n                           maxlength=\"8\">\n                </label>\n                <label class=\"item item-input item-stacked-label item-button-right\">\n                    <span class=\"input-label\">Endereço:</span>\n                    <input type=\"text\"\n                           class=\"cancelEnter enderecoKeyUp\"\n                           autocomplete=\"off\"\n                           ng-model=\"cartData.endereco\" placeholder=\"Ex.: Av. Brasil\">\n                    <div class=\"list list-inset\" ng-show=\"cartData.matches.length>0\">\n                        <div class=\"item item-divider\">Endereços encontrados:</div>\n                        <label class=\"item address-item\" ng-repeat=\"address in cartData.matches\">\n                            <button class=\"button button-small button-light\" type=\"button\"\n                                    ng-click=\"selecionaEndereco(address)\">\n                                {{address.logradouro}} {{address.complemento}} - CEP: {{address.cep}} - Bairro: {{address.bairro}}\n                            </button>\n                        </label>\n                    </div>\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Bairro:</span>\n                    <input type=\"text\" name=\"bairro\" ng-model=\"cartData.bairro\" placeholder=\"Ex.: Centro\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Número:</span>\n                    <input type=\"text\" name=\"numero\" ng-model=\"cartData.numero\" placeholder=\"Ex.: 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Complemento: <small>(opcional)</small></span>\n                    <input type=\"text\" name=\"complemento\" ng-model=\"cartData.complemento\" placeholder=\"Ex.: apartamento 109\">\n                </label>\n\n                <label class=\"item\">\n                    <button class=\"button button-block button-positive\" type=\"submit\">Solicitar Entrega</button>\n                </label>\n            </div>\n        </form>\n    </ion-content>\n</ion-view>\n");
$templateCache.put("tabs/tab-dash.html","<ion-view view-title=\"Dashboard\">\n  <ion-content class=\"padding\">\n    <h2>Welcome to Ionic</h2>\n    <p>\n    This is the Ionic starter for tabs-based apps. For other starters and ready-made templates, check out the <a href=\"http://market.ionic.io/starters\" target=\"_blank\">Ionic Market</a>.\n    </p>\n    <p>\n      To edit the content of each tab, edit the corresponding template file in <code>www/templates/</code>. This template is <code>www/templates/tab-dash.html</code>\n    </p>\n    <p>\n    If you need help with your app, join the Ionic Community on the <a href=\"http://forum.ionicframework.com\" target=\"_blank\">Ionic Forum</a>. Make sure to <a href=\"http://twitter.com/ionicframework\" target=\"_blank\">follow us</a> on Twitter to get important updates and announcements for Ionic developers.\n    </p>\n    <p>\n      For help sending push notifications, join the <a href=\"https://apps.ionic.io/signup\" target=\"_blank\">Ionic Platform</a> and check out <a href=\"http://docs.ionic.io/docs/push-overview\" target=\"_blank\">Ionic Push</a>. We also have other services available.\n    </p>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("tabs/tabs.html","<!--\nCreate tabs with an icon and label, using the tabs-positive style.\nEach tab\'s child <ion-nav-view> directive will have its own\nnavigation history that also transitions its views in and out.\n-->\n<ion-tabs class=\"tabs-icon-top tabs-color-active-positive\">\n    <!-- Home Tab -->\n    <ion-tab title=\"Produtos\" icon-off=\"ion-ios-home-outline\" icon-on=\"ion-ios-home\" href=\"#/tab/home\">\n        <ion-nav-view name=\"tab-home\"></ion-nav-view>\n    </ion-tab>\n\n     <!--Dashboard Tab-->\n    <ion-tab title=\"Carrinho {{ valorTotal | currency }}\" icon-off=\"ion-ios-cart-outline\" icon-on=\"ion-ios-cart\" href=\"#/tab/cart\">\n        <ion-nav-view name=\"tab-cart\"></ion-nav-view>\n    </ion-tab>\n\n    <!-- Chats Tab -->\n    <ion-tab title=\"Ajuda\" icon-off=\"ion-ios-chatboxes-outline\" icon-on=\"ion-ios-chatboxes\" href=\"#/tab/chats\">\n        <ion-nav-view name=\"tab-chats\"></ion-nav-view>\n    </ion-tab>\n\n    <!-- Account Tab -->\n    <ion-tab title=\"Minha Conta\" icon-off=\"ion-ios-gear-outline\" icon-on=\"ion-ios-gear\" href=\"#/tab/account\">\n        <ion-nav-view name=\"tab-account\"></ion-nav-view>\n    </ion-tab>\n</ion-tabs>");}]);