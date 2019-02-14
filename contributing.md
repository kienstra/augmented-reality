# Augmented Reality Guide To Contributing

## Development Setup

Please `cd` to `wp-content/plugins/` and clone this repo:

```bash
git clone git@github.com:kienstra/augmented-reality
```

Then, `cd` to the `augmented-reality/` directory and run `composer install` and `npm install`. This will install dependencies, including [wp-dev-lib](https://github.com/xwp/wp-dev-lib/). It will also install a [pre-commit hook](https://github.com/xwp/wp-dev-lib/blob/95d9ba72a90b3d3dbc02b1e48f4d8212467f7edc/scripts/pre-commit).

If you add a new class while developing, run `composer dump-autoload -o` in order to add the class to the composer autoloader. Also, add the class name to `Plugin::$classes` so that it's instantiated:

```php
/**
 * This plugin's PHP classes.
 *
 * @var array
 */
public $classes = array( 'Asset', 'Block' );
```

## PHPUnit Testing

You may run the PHPUnit tests in an environment where WordPress unit tests are installed, like [VVV](https://github.com/Varying-Vagrant-Vagrants/VVV).

To run tests:

``` bash
$ phpunit
```

To run tests with an HTML coverage report:

``` bash
$ phpunit --coverage-html /tmp/report
```

## Compiling The Block JavaScript File
If you've already run `npm install`, execute `npm run dev`. This will compile the block JavaScript file.

## Creating A Build
Assuming you've run `composer install` and `npm install` from the development setup, do `npm run build`. This will create an `augmented-reality.zip` file, and a `build/` directory. It will also compile the block JavaScript file.
