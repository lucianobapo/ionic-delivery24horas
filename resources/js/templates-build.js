angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("account/templates/tab-account.html","<ion-view view-title=\"Minha Conta\">\n  <ion-content>\n    <ion-list>\n      <ion-toggle ng-model=\"settings.enableFriends\">\n        E-mail de Confirmação\n      </ion-toggle>\n    </ion-list>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("advice/templates/advice.html","<ion-pane>\n    <ion-nav-bar class=\"bar-stable\">\n        <ion-nav-back-button></ion-nav-back-button>\n        <ion-nav-buttons side=\"left\">\n            <div class=\"delivery-bar-title title\">delivery24horas.com</div>\n        </ion-nav-buttons>\n    </ion-nav-bar>\n\n    <ion-content class=\"has-header\">\n        <div class=\"card\">\n            <div class=\"item item-divider\">\n                Aviso\n            </div>\n            <div class=\"item item-text-wrap\">\n                <p>{{ adviceMessage }}</p>\n            </div>\n        </div>\n    </ion-content>\n</ion-pane>");
$templateCache.put("chat/templates/chat-detail.html","<!--\n  This template loads for the \'tab.friend-detail\' state (app.js)\n  \'friend\' is a $scope variable created in the FriendsCtrl controller (controllers.js)\n  The FriendsCtrl pulls data from the Friends service (service.js)\n  The Friends service returns an array of friend data\n-->\n<ion-view view-title=\"{{chat.name}}\">\n  <ion-content class=\"padding\">\n    <img ng-src=\"{{chat.face}}\" style=\"width: 64px; height: 64px\">\n    <p>\n      {{chat.lastText}}\n    </p>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("chat/templates/tab-chats.html","<ion-view view-title=\"Chats\">\n  <ion-content>\n    <ion-list>\n      <ion-item class=\"item-remove-animate item-avatar item-icon-right\" ng-repeat=\"chat in chats\" type=\"item-text-wrap\" href=\"#/tab/chats/{{chat.id}}\">\n        <img ng-src=\"{{chat.face}}\">\n        <h2>{{chat.name}}</h2>\n        <p>{{chat.lastText}}</p>\n        <i class=\"icon ion-chevron-right icon-accessory\"></i>\n\n        <ion-option-button class=\"button-assertive\" ng-click=\"remove(chat)\">\n          Delete\n        </ion-option-button>\n      </ion-item>\n    </ion-list>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("cart/templates/cart.html","<ion-modal-view>\n    <ion-header-bar>\n        <h1 class=\"title\">Carrinho de Compras</h1>\n\n        <div class=\"buttons\" ng-if=\"minMediumScreens\">\n            <button class=\"button button-light\" ng-click=\"CartService.closeCart()\">Fechar</button>\n        </div>\n    </ion-header-bar>\n    <ion-content>\n        <div class=\"text-center\" ng-hide=\"CartService.existeItens()\">\n            <button class=\"button button-large button-full button-dark\" ng-click=\"CartService.closeCart()\">\n                Nenhum item selecionado\n            </button>\n        </div>\n\n        <div class=\"list list-inset\" ng-show=\"CartService.existeItens()\">\n            <div class=\"item item-divider\">Itens</div>\n            <div class=\"item item-button-right\" ng-repeat=\"item in cartItems\">\n                <p>{{ item.nome }}</p>\n                <span class=\"quantity\">{{ item.quantidade }} <small>x</small> </span><span class=\"price\">{{ item.valor | currency }}</span>\n                <button class=\"button button-light\" ng-click=\"removeItem(item.id)\">\n                    <i class=\"icon ion-close-circled\"></i>\n                </button>\n            </div>\n        </div>\n\n        <form class=\"cancelEnter\" ng-submit=\"CartService.doDelivery()\" ng-show=\"CartService.existeItens()\">\n            <div class=\"list\">\n                <div class=\"item item-divider\">Forma de Pagamento</div>\n\n                <div class=\"item text-center\">\n                    Valor Total: <span class=\"price\">{{ valorTotal | currency }}</span>\n                    <ion-list class=\"text-left\">\n                        <ion-radio name=\"pagamento\" ng-model=\"cartData.pagamento\" ng-value=\"\'dinheiro\'\">Dinheiro</ion-radio>\n                        <ion-radio name=\"pagamento\" ng-model=\"cartData.pagamento\" ng-value=\"\'debito\'\">\n                            <div class=\"pull-left\">Cartão Debito</div>\n                            <div class=\"pull-right\">\n                                <i class=\"fa fa-cc-visa fa-2x\"></i>\n                                <i class=\"fa fa-cc-mastercard fa-2x\"></i>\n                                <i class=\"fa fa-cc-diners-club fa-2x\"></i>\n                            </div>\n\n                        </ion-radio>\n                        <ion-radio name=\"pagamento\" ng-model=\"cartData.pagamento\" ng-value=\"\'credito\'\">\n                            <div class=\"pull-left\">Cartão Crédito</div>\n                            <div class=\"pull-right\">\n                                <i class=\"fa fa-cc-visa fa-2x\"></i>\n                                <i class=\"fa fa-cc-mastercard fa-2x\"></i>\n                                <i class=\"fa fa-cc-diners-club fa-2x\"></i>\n                            </div>\n                        </ion-radio>\n                    </ion-list>\n                </div>\n\n                <div class=\"item item-divider\">Dados da Entrega</div>\n\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Nome:</span>\n                    <label class=\"block\" ng-hide=\"cartData.showNameInput\">{{user.partner_nome}}</label>\n                    <input type=\"text\" autocomplete=\"off\" name=\"nome\" ng-show=\"cartData.showNameInput\" ng-model=\"cartData.nome\" placeholder=\"Ex.: João da Silva\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Nascimento: <small>(opcional)</small></span>\n                    <label class=\"block\" ng-hide=\"cartData.showDateInput\">{{user.partner_data_nascimento}}</label>\n                    <input type=\"date\" autocomplete=\"off\" ng-show=\"cartData.showDateInput\" name=\"data_nascimento\"\n                           ng-model=\"cartData.data_nascimento\"\n                           ng-value=\"cartData.data_nascimento\" placeholder=\"dd/mm/aaaa\">\n                </label>\n                <label class=\"item item-input item-stacked-label\" ng-class=\"{\'item-button-right\':(user.partner_emails.length>0)}\">\n                    <span class=\"input-label\">E-mail:</span>\n                    <!--<button type=\"button\" class=\"button button-light ion-edit\"-->\n                            <!--ng-show=\"user.partner_emails.length>0 && !cartData.emailChanged\" ng-click=\"cartData.emailChanged=true\"></button>-->\n                    <label class=\"block\" ng-hide=\"cartData.showEmailInput\">{{user.partner_emails[0]}}</label>\n                    <input type=\"email\" name=\"email\" ng-show=\"cartData.showEmailInput\" ng-model=\"cartData.email\" placeholder=\"Ex.: exemplo@gmail.com\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Telefone:</span>\n                    <label class=\"block\" ng-hide=\"cartData.showTelefoneInput\">{{user.partner_telefones[0]}}</label>\n                    <input type=\"tel\" name=\"telefone\" ng-show=\"cartData.showTelefoneInput\"\n                           ng-model=\"cartData.telefone\" placeholder=\"Ex.: (22)999 999 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Whatsapp:</span>\n                    <label class=\"block\" ng-hide=\"cartData.showWhatsappInput\">{{user.partner_whatsapps[0]}}</label>\n                    <input type=\"tel\" name=\"whatsapp\" ng-show=\"cartData.showWhatsappInput\"\n                           ng-model=\"cartData.whatsapp\" placeholder=\"Ex.: (22)999 999 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\" ng-show=\"cartData.showAddressList\">\n                    <div class=\"margin-left-off list list-inset\">\n                        <div class=\"item item-divider\">Endereços utilizados:</div>\n                        <ion-list class=\"text-left\">\n                            <ion-radio name=\"address\" ng-model=\"cartData.address_id\" ng-value=\"address.id\" class=\"address-item\"\n                                       ng-repeat=\"address in user.partner_addresses\">\n                                {{address.logradouro}} {{address.numero}} {{address.complemento}} - CEP: {{address.cep}} - Bairro: {{address.bairro}}\n                            </ion-radio>\n                            <ion-radio name=\"address\" ng-model=\"cartData.address_id\" ng-value=\"false\">Criar Novo Endereço</ion-radio>\n                        </ion-list>\n                    </div>\n                </label>\n                <label class=\"item item-input item-stacked-label\" ng-show=\"cartData.address_id===false\">\n                    <span class=\"input-label\">CEP:</span>\n                    <input type=\"tel\"\n                           class=\"numbersOnly cancelEnter cepKeyUp\"\n                           autocomplete=\"off\"\n                           ng-model=\"cartData.cep\" placeholder=\"Ex.: 28893818\"\n                           maxlength=\"8\">\n                </label>\n                <label class=\"item item-input item-stacked-label item-button-right\" ng-show=\"cartData.address_id===false\">\n                    <span class=\"input-label\">Endereço:</span>\n                    <input type=\"text\"\n                           class=\"cancelEnter enderecoKeyUp\"\n                           autocomplete=\"off\"\n                           ng-model=\"cartData.endereco\" placeholder=\"Ex.: Av. Brasil\">\n                    <div class=\"list list-inset\" ng-show=\"cartData.matches.length>0\">\n                        <div class=\"item item-divider\">Endereços encontrados:</div>\n                        <label class=\"item address-item\" ng-repeat=\"address in cartData.matches\">\n                            <button class=\"button button-small button-light\" type=\"button\"\n                                    ng-click=\"CartService.selecionaEndereco(address)\">\n                                {{address.logradouro}} {{address.complemento}} - CEP: {{address.cep}} - Bairro: {{address.bairro}}\n                            </button>\n                        </label>\n                    </div>\n                </label>\n                <label class=\"item item-input item-stacked-label\" ng-show=\"cartData.address_id===false\">\n                    <span class=\"input-label\">Bairro:</span>\n                    <input type=\"text\" autocomplete=\"off\" name=\"bairro\" ng-model=\"cartData.bairro\" placeholder=\"Ex.: Centro\">\n                </label>\n                <label class=\"item item-input item-stacked-label\" ng-show=\"cartData.address_id===false\">\n                    <span class=\"input-label\">Número:</span>\n                    <input type=\"text\" autocomplete=\"off\" name=\"numero\" ng-model=\"cartData.numero\" placeholder=\"Ex.: 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\" ng-show=\"cartData.address_id===false\">\n                    <span class=\"input-label\">Complemento: <small>(opcional)</small></span>\n                    <input type=\"text\" autocomplete=\"off\" name=\"complemento\" ng-model=\"cartData.complemento\" placeholder=\"Ex.: apartamento 109\">\n                </label>\n\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Observação: <small>(opcional)</small></span>\n                    <input type=\"text\" autocomplete=\"off\" name=\"observacao\" ng-model=\"cartData.observacao\" placeholder=\"Ex.: enviar mensagem ao chegar\">\n                </label>\n\n                <label class=\"item\">\n                    <button class=\"button button-block button-positive\" type=\"submit\" ng-disabled=\"disableButton\">Solicitar Entrega</button>\n                </label>\n            </div>\n        </form>\n    </ion-content>\n</ion-modal-view>\n");
$templateCache.put("common/templates/menu.html","<ion-side-menus enable-menu-with-back-views=\"false\">\n    <ion-side-menu-content>\n        <ion-nav-bar class=\"bar-stable\">\n            <ion-nav-back-button></ion-nav-back-button>\n            <ion-nav-buttons side=\"left\">\n                <button class=\"button button-icon button-clear ion-navicon\" menu-toggle=\"left\"\n                        ng-hide=\"$exposeAside.active\"></button>\n                <div class=\"delivery-bar-title title\">delivery24horas.com</div>\n            </ion-nav-buttons>\n            <ion-nav-buttons side=\"right\">\n                <button ng-if=\"cordova\" class=\"delivery-btn-social-header button button-positive btn-social\">\n                    <i class=\"ion-social-facebook\"></i>Entrar com Facebook\n                </button>\n\n                <!--<button class=\"button marging\" ng-class=\"{\'button-clear\': (valorTotal=0), \'button-balanced\': (valorTotal>0)}\">-->\n                <button class=\"button marging\"\n                        ng-click=\"CartService.showCart()\"\n                        ng-class=\"(valorTotal>0)?\'button-balanced\': \'button-clear\'\">\n                <!--<button class=\"button button-clear\">-->\n                    <i class=\"ion-android-cart\"></i> ({{ valorTotal | currency }})\n                </button>\n\n            </ion-nav-buttons>\n        </ion-nav-bar>\n        <ion-nav-view name=\"menuContent\"></ion-nav-view>\n    </ion-side-menu-content>\n\n    <ion-side-menu expose-aside-when=\"large\">\n        <!--<ion-header-bar class=\"bar-stable\">-->\n            <!--<h1 class=\"title\">Menu</h1>-->\n        <!--</ion-header-bar>-->\n        <ion-content>\n            <ion-refresher pulling-text=\"Deslize para Atualizar\" on-refresh=\"doRefresh()\"></ion-refresher>\n            <div class=\"list\">\n                <div class=\"item\">\n                    <!--<img style=\"max-width: 100%\" src=\"http://s3.amazonaws.com/delivery-images/campanhas/campanha-face4-230x121-compressed.png\">-->\n                    <img style=\"max-width: 100%\" ng-src=\"{{campanhasUrl+\'campanha-face4-230x121-compressed.png\'}}\">\n                </div>\n            </div>\n\n            <div class=\"card text-center\" ng-hide=\"categorias.length>0\">\n                <div class=\"item item-text-wrap\">\n                    <p ng-hide=\"loadingMessage===true\">{{ loadingMessage }}</p>\n                    <p ng-show=\"loadingMessage===true\">Carregando...</p><ion-spinner ng-show=\"loadingMessage===true\"></ion-spinner>\n                </div>\n            </div>\n            <div class=\"list\" ng-show=\"categorias.length>0\">\n                <div class=\"item item-divider\">Categorias</div>\n\n                <a ng-repeat=\"item in categorias\" href=\"#/app/productlist\" class=\"item item-icon-left\"\n                   menu-close ng-click=\"loadCategoria(item.nome);loadProducts(item.id)\">\n                    <i class=\"{{ item.icon }}\"></i>\n                    {{ item.nome }}\n                </a>\n\n                <a href=\"#/app/productlist\" class=\"item item-icon-left\"\n                   menu-close ng-click=\"loadCategoria(\'Todas\');loadProducts()\">\n                    <i class=\"icon ion-beer\"></i>\n                    Todas\n                </a>\n                <!--<div class=\"item item-divider\">Relatórios</div>-->\n                <!--<a href=\"#/app/report\" class=\"item item-icon-left\" menu-close>-->\n                    <!--<i class=\"ion-document-text\"></i>-->\n                    <!--Relatórios-->\n                <!--</a>-->\n                <!--<a href=\"#/app/browse\" class=\"item item-icon-left\" menu-close>-->\n                    <!--<i class=\"ion-document-text\"></i>-->\n                    <!--Browse-->\n                <!--</a>-->\n\n                <!--<div class=\"item item-divider\">Minha conta</div>-->\n                <!--<div class=\"item\">Meus Dados</div>-->\n                <!--<div class=\"item\">Trocar Senha</div>-->\n                <!--<div class=\"item\">Sair</div>-->\n\n            </div>\n        </ion-content>\n    </ion-side-menu>\n</ion-side-menus>");
$templateCache.put("common/templates/tabs.html","<!--\nCreate tabs with an icon and label, using the tabs-positive style.\nEach tab\'s child <ion-nav-view> directive will have its own\nnavigation history that also transitions its views in and out.\n-->\n<ion-tabs class=\"tabs-icon-top tabs-color-active-positive\">\n    <!-- Home Tab -->\n    <ion-tab title=\"Produtos\" icon-off=\"ion-ios-home-outline\" icon-on=\"ion-ios-home\" href=\"#/tab/home\">\n        <ion-nav-view name=\"tab-home\"></ion-nav-view>\n    </ion-tab>\n\n     <!--Dashboard Tab-->\n    <ion-tab title=\"Carrinho {{ valorTotal | currency }}\" icon-off=\"ion-ios-cart-outline\" icon-on=\"ion-ios-cart\" href=\"#/tab/cart\">\n        <ion-nav-view name=\"tab-cart\"></ion-nav-view>\n    </ion-tab>\n\n    <!-- Chats Tab -->\n    <ion-tab ng-if=\"false\" title=\"Ajuda\" icon-off=\"ion-ios-chatboxes-outline\" icon-on=\"ion-ios-chatboxes\" href=\"#/tab/chats\">\n        <ion-nav-view name=\"tab-chats\"></ion-nav-view>\n    </ion-tab>\n\n    <!-- Account Tab -->\n    <ion-tab ng-if=\"user.userID\" title=\"Minha Conta\" icon-off=\"ion-ios-gear-outline\" icon-on=\"ion-ios-gear\" href=\"#/tab/account\">\n        <ion-nav-view name=\"tab-account\"></ion-nav-view>\n    </ion-tab>\n</ion-tabs>");
$templateCache.put("productlist/templates/productlist.html","<ion-view view-title=\"\">\n    <div class=\"bar item-input-inset\" ng-class=\"{\'bar-subheader\': minMediumScreens}\">\n        <label class=\"item-input-wrapper\">\n            <i class=\"icon ion-ios-search placeholder-icon\"></i>\n            <input type=\"search\" placeholder=\"Busca de produtos\" ng-model=\"query\">\n        </label>\n        <button ng-if=\"query.length\"\n                class=\"input-button button button-icon ion-close-circled\"\n                ng-click=\"clearSearch()\">\n        </button>\n        <!--<button class=\"button button-clear\" ng-click=\"query = \'\'\">-->\n            <!--Cancelar-->\n        <!--</button>-->\n    </div>\n    <ion-content ng-class=\"{\'has-subheader\': minMediumScreens, \'has-header\': handhelds}\">\n        <ion-refresher pulling-text=\"Deslize para Atualizar\" on-refresh=\"doRefresh()\"></ion-refresher>\n\n        <div class=\"list delivery-list delivery-list-with-menu\">\n            <div class=\"item\" ng-show=\"user.userID\">\n                <div class=\"list\">\n                    <div class=\"item item-avatar\">\n                        <img class=\"\" ng-src=\"{{ user.picture }}\">\n                        <p>{{ user.name }}</p>\n                        <button ng-show=\"user.userID\" class=\"button btn-social\" ng-click=\"facebookLogOut()\" ng-disabled=\"facebookLogoutButtonDisabled\">\n                            <i class=\"ion-social-facebook\"></i>{{ facebookLogoutButtonText }}\n                        </button>\n                    </div>\n                </div>\n            </div>\n            <div class=\"item item-button-right delivery-btn-social\" ng-show=\"!user.userID\">\n                <button ng-show=\"!user.userID\" class=\"button btn-social\" ng-click=\"facebookLogIn()\" ng-disabled=\"facebookLoginButtonDisabled\">\n                    <i class=\"ion-social-facebook\"></i>{{ facebookLoginButtonText }}\n                </button>\n            </div>\n            <!--<div class=\"item\" ng-if=\"!cordova\">-->\n                <!--<div id=\"fb-root\"></div>-->\n                <!--&lt;!&ndash;<fb:login-button scope=\"public_profile,email\" onlogin=\"console.log(angular);\">&ndash;&gt;-->\n                <!--&lt;!&ndash;</fb:login-button>&ndash;&gt;-->\n                <!--<div class=\"fb-login-button\" data-max-rows=\"1\" data-size=\"medium\"-->\n                     <!--data-scope=\"public_profile,email,user_birthday\" data-show-faces=\"true\" data-auto-logout-link=\"true\"></div>-->\n                <!--&lt;!&ndash;<div id=\"status\"></div>&ndash;&gt;-->\n            <!--</div>-->\n            <!--<div class=\"item\">-->\n                <!--<img style=\"max-width: 100%\" src=\"http://s3.amazonaws.com/delivery-images/campanhas/campanha-face4-compressed.png\">-->\n                <!--<div class=\"delivery-logo-block\">-->\n\n                    <!--<img ng-src=\"{{logoUrl+\'logo-delivery2-resized-compressed.png\'}}\">-->\n                    <!--<p ng-hide=\"$exposeAside.active\"><span class=\"ion-arrow-left-a\"></span> Acesse o Menu ao lado</p>-->\n                <!--</div>-->\n            <!--</div>-->\n\n        </div>\n\n        <div class=\"delivery-list-with-menu\">\n\n            <div class=\"card text-center\" ng-hide=\"products.length>0\">\n                <div class=\"item item-text-wrap\">\n                    <p ng-hide=\"loadingMessage===true\">{{ loadingMessage }}</p>\n                    <p ng-show=\"loadingMessage===true\">Carregando...</p>\n                    <!--<ion-spinner ng-show=\"loadingMessage===true\"></ion-spinner>-->\n                </div>\n            </div>\n\n            <div ng-class=\"{card: minMediumScreens, list: handhelds, \'list-inset\': handhelds}\" class=\"padding-right\" ng-show=\"products.length>0\">\n                <div class=\"item item-divider\">{{ rootCategoriaSelecionada }}</div>\n                <div class=\"item resultCount\" ng-if=\"query.length\"><span>{{ filtered.length }} de {{ products.length }}</span></div>\n                <div class=\"delivery-product-item\" ng-class=\"{item: handhelds, \'item-thumbnail-left\': handhelds}\"\n                     ng-repeat=\"produto in filtered = (products | filter: query)\">\n                    <img ng-src=\"{{ prepareImage(produto.imagem) }}\"\n                         alt=\"Imagem do produto {{ produto.nome }}\"\n                         title=\"Imagem do produto {{ produto.nome }}\">\n                    <div>\n                        <span class=\"price\">{{ produto.valor | currency }}<small ng-show=\"quantidade[produto.id]>0\"> x <span class=\"quantity\">{{ quantidade[produto.id] }}</span></small></span>\n                        <p>{{ produto.nome }}</p>\n                    </div>\n\n                    <div class=\"range\" ng-show=\"produto.max>0\">\n                        <button ng-click=\"decrementa(produto.id)\" class=\"button button-light\"><i class=\"icon ion-chevron-left\"></i></button>\n                        <input type=\"range\" ng-change=\"rangeChange(produto.id)\" id=\"quantidade[{{ produto.id }}]\"\n                               name=\"quantidade[{{ produto.id }}]\" ng-model=\"quantidade[produto.id]\"\n                               min=\"0\" max=\"{{ produto.max }}\">\n                        <button ng-click=\"incrementa(produto.id)\" class=\"button button-light\"><i class=\"icon ion-chevron-right\"></i></button>\n                    </div>\n                    <div ng-hide=\"produto.max>0\">\n                        <p class=\"indisponivel\">Indisponível</p>\n                        <ion-toggle ng-show=\"user.userID\" class=\"delivery-toggle-small toggle-small\" ng-model=\"settings.enableFriends\">\n\n                            <div>Avisar retorno</div>\n                        </ion-toggle>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"delivery-menu-left\" ng-show=\"categorias.length>0\">\n\n            <button ng-click=\"loadProducts();loadCategoria(\'Favoritos\');\"\n                    class=\"delivery-button button button-stable\">\n                <i class=\"icon fa fa-star\"></i>\n                <p>Favoritos</p>\n            </button>\n            <button ng-click=\"loadProducts(item.id);loadCategoria(item.nome);\"\n                    ng-repeat=\"item in categorias\"\n                    class=\"delivery-button button button-stable\">\n                <i class=\"{{ item.icon }}\"></i>\n                <p>{{ item.nome }}</p>\n            </button>\n            <button ng-click=\"loadProducts();loadCategoria(\'Todas\');\"\n                    class=\"delivery-button button button-stable\">\n                <i class=\"icon fa fa-globe\"></i>\n                <p>Todas</p>\n            </button>\n        </div>\n\n        <ion-infinite-scroll\n                ng-if=\"!noMoreItemsAvailable\"\n                on-infinite=\"loadMoreData()\"\n                distance=\"10%\">\n        </ion-infinite-scroll>\n    </ion-content>\n\n</ion-view>");
$templateCache.put("report/templates/report.html","<ion-view view-title=\"Relatórios\">\n    <ion-content class=\"padding\">\n        <h1>{{ titulo }}</h1>\n        <p>\n            <a class=\"button icon icon-right ion-chevron-right\" href=\"#/app/report\">titulo</a>\n        </p>\n    </ion-content>\n</ion-view>");
$templateCache.put("version/templates/version.html","<ion-pane>\n    <ion-nav-bar class=\"bar-stable\">\n        <ion-nav-back-button></ion-nav-back-button>\n        <ion-nav-buttons side=\"left\">\n            <div class=\"delivery-bar-title title\">delivery24horas.com</div>\n        </ion-nav-buttons>\n    </ion-nav-bar>\n\n    <ion-content class=\"has-header\">\n        <div class=\"card\">\n            <div class=\"item item-divider\">\n                Aplicativo desatualizado\n            </div>\n            <div class=\"item item-text-wrap\">\n                <p>Este Aplicativo precisa ser atualizado para uma versão mais nova</p>\n                <p>Versão atual: {{ appVersion }}</p>\n                <p>Versão nova: {{ appNewVersion }}</p>\n            </div>\n        </div>\n    </ion-content>\n</ion-pane>");
$templateCache.put("browse.html","<ion-view view-title=\"Browse\">\n  <ion-content>\n    <h1>Browse</h1>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("loading.html","<div class=\"loading-container visible active\">\n    <div class=\"loading\">\n        <p>Carregando...</p><ion-spinner></ion-spinner>\n    </div>\n</div>");
$templateCache.put("login.html","<ion-modal-view>\n  <ion-header-bar>\n    <h1 class=\"title\">Login</h1>\n    <div class=\"buttons\">\n      <button class=\"button button-clear\" ng-click=\"closeLogin()\">Close</button>\n    </div>\n  </ion-header-bar>\n  <ion-content>\n    <form ng-submit=\"doLogin()\">\n      <div class=\"list\">\n        <label class=\"item item-input\">\n          <span class=\"input-label\">Username</span>\n          <input type=\"text\" ng-model=\"loginData.username\">\n        </label>\n        <label class=\"item item-input\">\n          <span class=\"input-label\">Password</span>\n          <input type=\"password\" ng-model=\"loginData.password\">\n        </label>\n        <label class=\"item\">\n          <button class=\"button button-block button-positive\" type=\"submit\">Log in</button>\n        </label>\n      </div>\n    </form>\n  </ion-content>\n</ion-modal-view>\n");
$templateCache.put("search.html","<ion-view view-title=\"Search\">\n  <ion-content>\n    <h1>Search</h1>\n  </ion-content>\n</ion-view>\n");}]);