// Generated by CoffeeScript 1.6.3
(function() {
  var AmorphousRecipe, Chest, ChestDialog, CraftingThesaurus, Inventory, InventoryWindow, ItemPile, Modal, PositionalRecipe, Recipe, RecipeList, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Modal = require('voxel-modal');

  Inventory = require('inventory');

  InventoryWindow = require('inventory-window');

  ItemPile = require('itempile');

  _ref = require('craftingrecipes'), Recipe = _ref.Recipe, AmorphousRecipe = _ref.AmorphousRecipe, PositionalRecipe = _ref.PositionalRecipe, CraftingThesaurus = _ref.CraftingThesaurus, RecipeList = _ref.RecipeList;

  module.exports = function(game, opts) {
    return new Chest(game, opts);
  };

  module.exports.pluginInfo = {
    loadAfter: ['voxel-blockdata', 'voxel-registry', 'craftingrecipes']
  };

  Chest = (function() {
    function Chest(game, opts) {
      var _ref1, _ref2, _ref3, _ref4;
      this.game = game;
      this.playerInventory = (function() {
        if ((_ref1 = opts.playerInventory) != null) {
          return _ref1;
        } else {
          throw 'voxel-chest requires "playerInventory" set to inventory instance';
        }
      })();
      this.registry = (_ref2 = game.plugins) != null ? _ref2.get('voxel-registry') : void 0;
      this.recipes = (_ref3 = game.plugins) != null ? _ref3.get('craftingrecipes') : void 0;
      this.blockdata = (_ref4 = game.plugins) != null ? _ref4.get('voxel-blockdata') : void 0;
      if (opts.registerBlock == null) {
        opts.registerBlock = this.registry != null;
      }
      if (opts.registerRecipe == null) {
        opts.registerRecipe = this.recipes != null;
      }
      this.chestDialog = new ChestDialog(game, this.playerInventory, this.registry, this.blockdata);
      this.opts = opts;
      this.enable();
    }

    Chest.prototype.enable = function() {
      var _this = this;
      if (this.opts.registerBlock) {
        this.registry.registerBlock('chest', {
          texture: ['door_wood_lower', 'piston_top_normal', 'bookshelf'],
          onInteract: function() {
            _this.chestDialog.open();
            return true;
          }
        });
      }
      if (this.opts.registerRecipe) {
        return this.recipes.register(new PositionalRecipe([['wood.plank', 'wood.plank', 'wood.plank'], ['wood.plank', void 0, 'wood.plank'], ['wood.plank', 'wood.plank', 'wood.plank']], new ItemPile('chest', 1)));
      }
    };

    Chest.prototype.disable = function() {};

    return Chest;

  })();

  ChestDialog = (function(_super) {
    __extends(ChestDialog, _super);

    function ChestDialog(game, playerInventory, registry, blockdata) {
      var chestCont;
      this.game = game;
      this.playerInventory = playerInventory;
      this.registry = registry;
      this.blockdata = blockdata;
      this.playerIW = new InventoryWindow({
        width: 10,
        inventory: this.playerInventory
      });
      this.chestInventory = new Inventory(10, 3);
      this.chestIW = new InventoryWindow({
        inventory: this.chestInventory
      });
      this.dialog = document.createElement('div');
      this.dialog.style.border = '6px outset gray';
      this.dialog.style.visibility = 'hidden';
      this.dialog.style.position = 'absolute';
      this.dialog.style.top = '20%';
      this.dialog.style.left = '30%';
      this.dialog.style.zIndex = 1;
      this.dialog.style.backgroundImage = 'linear-gradient(rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.5) 100%)';
      document.body.appendChild(this.dialog);
      chestCont = this.chestIW.createContainer();
      this.dialog.appendChild(chestCont);
      this.dialog.appendChild(document.createElement('br'));
      this.dialog.appendChild(this.playerIW.createContainer());
      ChestDialog.__super__.constructor.call(this, game, {
        element: this.dialog
      });
    }

    return ChestDialog;

  })(Modal);

}).call(this);
