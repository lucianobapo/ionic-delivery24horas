angular.module("templates").run(["$templateCache", function($templateCache) {$templateCache.put("common/templates/menu.html","<ion-side-menus enable-menu-with-back-views=\"false\">\n    <ion-side-menu-content>\n        <ion-nav-bar class=\"bar-stable\">\n            <ion-nav-back-button></ion-nav-back-button>\n            <ion-nav-buttons side=\"left\">\n                <button class=\"button button-icon button-clear ion-navicon\" menu-toggle=\"left\"\n                        ng-hide=\"$exposeAside.active\"></button>\n                <div class=\"delivery-bar-title title\">delivery24horas.com</div>\n            </ion-nav-buttons>\n            <ion-nav-buttons side=\"right\">\n                <button class=\"delivery-btn-social-header button button-positive btn-social\">\n                    <i class=\"ion-social-facebook\"></i>Login com Facebook\n                </button>\n\n                <!--<button class=\"button marging\" ng-class=\"{\'button-clear\': (valorTotal=0), \'button-balanced\': (valorTotal>0)}\">-->\n                <button class=\"button marging\"\n                        ng-click=\"showCart()\"\n                        ng-class=\"(valorTotal>0)?\'button-clear button-balanced\': \'button-clear\'\">\n                <!--<button class=\"button button-clear\">-->\n                    <i class=\"ion-android-cart\"></i> ({{ valorTotal | currency }})\n                </button>\n            </ion-nav-buttons>\n        </ion-nav-bar>\n        <ion-nav-view name=\"menuContent\"></ion-nav-view>\n    </ion-side-menu-content>\n\n    <ion-side-menu expose-aside-when=\"large\">\n        <ion-header-bar class=\"bar-stable\">\n            <h1 class=\"title\">Menu</h1>\n        </ion-header-bar>\n        <ion-content>\n            <ion-refresher pulling-text=\"Deslize para Atualizar\" on-refresh=\"doRefresh()\"></ion-refresher>\n            <div class=\"list list-inset\">\n                <div class=\"item item-divider\">Categorias</div>\n\n                <a href=\"#/app/productlist\" class=\"item item-icon-left\"\n                   menu-close ng-click=\"loadCategoria(\'Todas\');loadProducts()\">\n                    <i class=\"icon ion-beer\"></i>\n                    Todas\n                </a>\n                <a ng-repeat=\"item in categorias\" href=\"#/app/productlist\" class=\"item item-icon-left\"\n                   menu-close ng-click=\"loadCategoria(item.nome);loadProducts(item.id)\">\n                    <i class=\"{{ item.icon }}\"></i>\n                    {{ item.nome }}\n                </a>\n\n                <div class=\"item item-divider\">Relatórios</div>\n                <a href=\"#/app/report\" class=\"item item-icon-left\" menu-close>\n                    <i class=\"ion-document-text\"></i>\n                    Relatórios\n                </a>\n                <a href=\"#/app/browse\" class=\"item item-icon-left\" menu-close>\n                    <i class=\"ion-document-text\"></i>\n                    Browse\n                </a>\n\n                <div class=\"item item-divider\">Minha conta</div>\n                <div class=\"item\">Meus Dados</div>\n                <div class=\"item\">Trocar Senha</div>\n                <div class=\"item\">Sair</div>\n\n            </div>\n        </ion-content>\n    </ion-side-menu>\n</ion-side-menus>");
$templateCache.put("productlist/templates/productlist.html","<ion-view view-title=\"\">\n    <div class=\"bar bar-subheader item-input-inset\">\n        <label class=\"item-input-wrapper\">\n            <i class=\"icon ion-ios-search placeholder-icon\"></i>\n            <input type=\"search\" placeholder=\"Busca de produtos\" ng-model=\"query\">\n        </label>\n        <button class=\"button button-clear\" ng-click=\"query = \'\'\">\n            Cancelar\n        </button>\n    </div>\n    <ion-content class=\"has-subheader\">\n        <ion-refresher pulling-text=\"Deslize para Atualizar\" on-refresh=\"doRefresh()\"></ion-refresher>\n\n        <div class=\"list delivery-list\">\n\n            <div class=\"item item-button-right delivery-btn-social\">\n                <button class=\"button button-positive btn-social\">\n                    <i class=\"ion-social-facebook\"></i>Login com Facebook\n                </button>\n            </div>\n            <div class=\"item\">\n                <div class=\"delivery-logo-block\">\n                    <img ng-src=\"{{logoUrl+\'logo-delivery2-compressed.png\'}}\">\n                    <p ng-hide=\"$exposeAside.active\"><span class=\"ion-arrow-left-a\"></span> Acesse o Menu ao lado</p>\n                </div>\n            </div>\n\n        </div>\n\n        <div ng-class=\"{card: minMediumScreens, list: handhelds, \'list-inset\': handhelds}\">\n            <div class=\"item item-divider\">{{ rootCategoriaSelecionada }}</div>\n            <div class=\"delivery-product-item\" ng-class=\"{item: handhelds, \'item-thumbnail-left\': handhelds}\"\n                 ng-repeat=\"produto in products | filter: query\">\n\n                <img ng-src=\"{{ prepareImage(produto.imagem) }}\"\n                     alt=\"Imagem do produto {{ produto.nome }}\"\n                     title=\"Imagem do produto {{ produto.nome }}\">\n                <div>\n                    <span class=\"price\">{{ produto.valor | currency }}<small ng-show=\"quantidade[produto.id]>0\"> x <span class=\"quantity\">{{ quantidade[produto.id] }}</span></small></span>\n                    <p>{{ produto.nome }}</p>\n                </div>\n\n                <div class=\"range\">\n                    <button ng-click=\"decrementa(produto.id)\" class=\"button button-light\"><i class=\"icon ion-chevron-left\"></i></button>\n                    <input type=\"range\" ng-change=\"somaTotal()\" id=\"quantidade[{{ produto.id }}]\"\n                           name=\"quantidade[{{ produto.id }}]\" ng-model=\"quantidade[produto.id]\"\n                           min=\"0\" max=\"{{ produto.max }}\">\n                    <button ng-click=\"incrementa(produto.id)\" class=\"button button-light\"><i class=\"icon ion-chevron-right\"></i></button>\n                </div>\n            </div>\n        </div>\n    </ion-content>\n</ion-view>");
$templateCache.put("report/templates/report.html","<ion-view view-title=\"Relatórios\">\n    <ion-content class=\"padding\">\n        <h1>{{ titulo }}</h1>\n        <p>\n            <a class=\"button icon icon-right ion-chevron-right\" href=\"#/app/report\">titulo</a>\n        </p>\n    </ion-content>\n</ion-view>");
$templateCache.put("browse.html","<ion-view view-title=\"Browse\">\n  <ion-content>\n    <h1>Browse</h1>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("cart.html","<ion-modal-view>\n    <ion-header-bar>\n        <h1 class=\"title\">Carrinho</h1>\n\n        <div class=\"buttons\">\n            <button class=\"button button-clear\" ng-click=\"closeCart()\">Fechar</button>\n        </div>\n    </ion-header-bar>\n    <ion-content>\n        <div class=\"text-center\" ng-hide=\"valorTotal>0\">\n            <button class=\"button button-large button-full button-dark\" ng-click=\"closeCart()\">\n                Carrinho de Compras Vazio\n            </button>\n        </div>\n\n        <div class=\"list list-inset\" ng-show=\"valorTotal>0\">\n            <div class=\"item item-divider\">Itens</div>\n            <div class=\"item item-button-right\" ng-repeat=\"item in cartItems\">\n                <p>{{ item.nome }}</p>\n                <span class=\"quantity\">{{ item.quantidade }} <small>x</small> </span><span class=\"price\">{{ item.valor | currency }}</span>\n                <button class=\"button button-light\" ng-click=\"removeCartItem(item.id)\">\n                    <i class=\"icon ion-close-circled\"></i>\n                </button>\n            </div>\n        </div>\n\n        <form ng-submit=\"doDelivery()\" ng-show=\"valorTotal>0\">\n            <div class=\"list\">\n                <div class=\"item item-divider\">Valor Total</div>\n                <div class=\"item text-center\"><span class=\"price\">{{ valorTotal | currency }}</span></div>\n                <div class=\"item item-divider\">Dados da Entrega</div>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Nome:</span>\n                    <input type=\"text\" name=\"nome\" ng-model=\"cartData.nome\" placeholder=\"Ex.: João da Silva\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">E-mail:</span>\n                    <input type=\"email\" name=\"email\" ng-model=\"cartData.email\" placeholder=\"Ex.: exemplo@gmail.com\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Telefone:</span>\n                    <input type=\"tel\" name=\"telefone\" ng-model=\"cartData.telefone\" placeholder=\"Ex.: (22)999 999 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Whatsapp:</span>\n                    <input type=\"tel\" name=\"whatsapp\" ng-model=\"cartData.whatsapp\" placeholder=\"Ex.: (22)999 999 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">CEP:</span>\n                    <input type=\"text\"\n                           ng-keyup=\"cepKeyup($event)\"\n                           autocomplete=\"off\"\n                           ng-model=\"cartData.cep\" placeholder=\"Ex.: 28893818\"\n                           maxlength=\"8\">\n                </label>\n                <label class=\"item item-input item-stacked-label item-button-right\">\n                    <span class=\"input-label\">Endereço:</span>\n                    <input type=\"text\"\n                           ng-keyup=\"enderecoKeyup()\"\n                           autocomplete=\"off\"\n                           ng-model=\"cartData.endereco\" placeholder=\"Ex.: Av. Brasil\">\n                    <div class=\"list list-inset\" ng-show=\"cartData.matches.length>0\">\n                        <div class=\"item item-divider\">Endereços encontrados:</div>\n                        <label class=\"item address-item\" ng-repeat=\"address in cartData.matches\">\n                            <button class=\"button button-small button-light\" type=\"button\" ng-click=\"selecionaEndereco(address)\">\n                                {{address.logradouro}} - CEP: {{address.cep}} - Bairro: {{address.bairro}}\n                            </button>\n                        </label>\n                    </div>\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Número:</span>\n                    <input type=\"text\" name=\"numero\" ng-model=\"cartData.numero\" placeholder=\"Ex.: 999\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Complemento:</span>\n                    <input type=\"text\" name=\"complemento\" ng-model=\"cartData.complemento\" placeholder=\"Ex.: apartamento 109\">\n                </label>\n                <label class=\"item item-input item-stacked-label\">\n                    <span class=\"input-label\">Bairro:</span>\n                    <input type=\"text\" name=\"bairro\" ng-model=\"cartData.bairro\" placeholder=\"Ex.: Centro\">\n                </label>\n                <label class=\"item\">\n                    <button class=\"button button-block button-positive\" type=\"submit\">Solicitar Entrega</button>\n                </label>\n            </div>\n        </form>\n    </ion-content>\n</ion-modal-view>\n");
$templateCache.put("home.html","<ion-view view-title=\"\" ng-controller=\"ProductsCtrl\">\n    <div class=\"bar bar-subheader item-input-inset\">\n        <label class=\"item-input-wrapper\">\n            <i class=\"icon ion-ios-search placeholder-icon\"></i>\n            <input type=\"search\" placeholder=\"Busca de produtos\" ng-model=\"query\">\n        </label>\n        <button class=\"button button-clear\" ng-click=\"query = \'\'\">\n            Cancelar\n        </button>\n    </div>\n    <ion-content class=\"has-subheader\">\n        <ion-refresher pulling-text=\"Deslize para Atualizar\" on-refresh=\"doRefresh()\"></ion-refresher>\n\n        <div class=\"list delivery-list\">\n\n            <div class=\"item item-button-right\">\n                <button class=\"delivery-btn-social-top button button-positive btn-social\">\n                    <i class=\"ion-social-facebook\"></i>Login com Facebook\n                </button>\n            </div>\n            <div class=\"item\">\n                <div class=\"delivery-logo-block\">\n                    <img ng-src=\"{{logoUrl+\'logo-delivery2-compressed.png\'}}\">\n                    <p ng-hide=\"$exposeAside.active\"><span class=\"ion-arrow-left-a\"></span> Acesse o Menu ao lado</p>\n                </div>\n            </div>\n\n        </div>\n\n        <div class=\"card delivery-product-block\">\n            <div class=\"item item-divider\">{{ rootCategoriaSelecionada }}</div>\n            <div class=\"row\">\n                <div class=\"padding text-center\" ng-repeat=\"produto in products | filter: query\">\n                    <div class=\"thumbnail\">\n                        <img ng-src=\"{{ imagesUrl+produto.imagem }}\"\n                             alt=\"Imagem do produto {{ produto.nome }}\"\n                             title=\"Imagem do produto {{ produto.nome }}\">\n                        <h4 class=\"\">{{ produto.valorUnitVenda | currency }}</h4>\n                        <p>{{ produto.nome }}</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"list list-inset delivery-product-list\">\n\n            <div class=\"item item-divider\">{{ rootCategoriaSelecionada }}</div>\n\n            <div class=\"item item-thumbnail-left\" ng-repeat=\"produto in products | filter: query\">\n                <img ng-src=\"{{ imagesUrl+produto.imagem }}\"\n                     alt=\"Imagem do produto {{ produto.nome }}\"\n                     title=\"Imagem do produto {{ produto.nome }}\">\n                <h2>{{ produto.nome }}</h2>\n                <p>{{ produto.valorUnitVenda | currency }}</p>\n            </div>\n\n        </div>\n\n    </ion-content>\n</ion-view>");
$templateCache.put("loading.html","<div class=\"loading-container visible active\">\n    <div class=\"loading\">\n        <p>Carregando...</p><ion-spinner></ion-spinner>\n    </div>\n</div>");
$templateCache.put("login.html","<ion-modal-view>\n  <ion-header-bar>\n    <h1 class=\"title\">Login</h1>\n    <div class=\"buttons\">\n      <button class=\"button button-clear\" ng-click=\"closeLogin()\">Close</button>\n    </div>\n  </ion-header-bar>\n  <ion-content>\n    <form ng-submit=\"doLogin()\">\n      <div class=\"list\">\n        <label class=\"item item-input\">\n          <span class=\"input-label\">Username</span>\n          <input type=\"text\" ng-model=\"loginData.username\">\n        </label>\n        <label class=\"item item-input\">\n          <span class=\"input-label\">Password</span>\n          <input type=\"password\" ng-model=\"loginData.password\">\n        </label>\n        <label class=\"item\">\n          <button class=\"button button-block button-positive\" type=\"submit\">Log in</button>\n        </label>\n      </div>\n    </form>\n  </ion-content>\n</ion-modal-view>\n");
$templateCache.put("search.html","<ion-view view-title=\"Search\">\n  <ion-content>\n    <h1>Search</h1>\n  </ion-content>\n</ion-view>\n");}]);