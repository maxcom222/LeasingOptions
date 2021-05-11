const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev: dev })
const handle = app.getRequestHandler()

const pagesArray = [
    { url: "/car-leasing/short-term", destination: "/short-term-car-leasing" },
    { url: "/van-leasing/short-term", destination: "/short-term-van-leasing" },
    { url: "/about", destination: "/our-story" },
    { url: "/taxcalculator", destination: "/what-is-bik-tax" },
    { url: "/twentyfiveyearsofservice", destination: "/our-story" },
    { url: "/twentyfiveyear", destination: "/our-story" },
    { url: "/businesscontracthire", destination: "/advice/what-is-car-leasing" },
    { url: "/carcontractpurchase", destination: "/advice/what-is-car-leasing" },
    { url: "/financeleasepurchase", destination: "/advice/what-is-car-leasing" },
    { url: "/financeleasescheme", destination: "/advice/what-is-car-leasing" },
    { url: "/fleetdiscounts", destination: "/" },
    { url: "/fleetmanagement", destination: "/" },
    { url: "/fueldiscountcards", destination: "/" },
    { url: "/insurance", destination: "/look-after-my-car" },
    { url: "/newcarleasing", destination: "/advice/what-is-car-leasing" },
    { url: "/personalcontracthire", destination: "/advice/what-is-car-leasing" },
    { url: "/personalcontractpurchase", destination: "/advice/what-is-car-leasing" },
    { url: "/testimonials", destination: "/our-story" },
    { url: "/privacystatement", destination: "/privacy-cookie-policy" },
    { url: "/terms", destination: "/terms-and-conditions" },
    { url: "/bvrla_guide", destination: "/initial-disclosure" },
    { url: "/shortterm", destination: "/advice/what-is-car-leasing" },
    { url: "/carleasing", destination: "/advice/what-is-car-leasing" },
    { url: "/downloads", destination: "/complaints" },
    { url: "/maps", destination: "/contact" },
    { url: "/sitemapindex.ashx", destination: "/sitemap.xml" },
    { url: "/newssitemap.ashx", destination: "/sitemap-news.xml" },
    { url: "/newssitemap.xml", destination: "/sitemap-news.xml" },
    { url: "/whyleaseavehicle", destination: "/advice/what-is-car-leasing" },
    { url: "/contracthireexplained", destination: "/advice/what-is-car-leasing" },
    { url: "/eco/personal", destination: "/car-leasing" },
    { url: "/eco/business", destination: "/business-car-leasing" },
    { url: "/car-leasing/business", destination: "/business-car-leasing" },
    { url: "/car-leasing/personal", destination: "/car-leasing" },
    { url: "/van", destination: "/van-leasing" },
    { url: "/faq", destination: "/car-leasing-faqs" },
    { url: "/specialoffers", destination: "/car-leasing-deals" },
    { url: "/cookiepolicy", destination: "/privacy-cookie-policy" },
    { url: "/privacypolicy", destination: "/privacy-cookie-policy" },
    { url: "/requestcallback", destination: "/request-callback" },
    { url: "/initialdisclosure", destination: "/initial-disclosure" },
    { url: "/termsandconditions", destination: "/terms-and-conditions" },
    { url: "/fairwearandtear", destination: "/fair-wear-and-tear" },
    { url: "/ourstory", destination: "/our-story" },
    { url: "/whyleasewithus", destination: "/our-story" },
    { url: "/pricepromise", destination: "/price-promise" },
    { url: "/treatingcustomersfairly", destination: "/treating-customers-fairly" },
    { url: "/valueyourcar", destination: "/value-your-car" },
    { url: "/mygarage", destination: "/my-garage" },
    { url: "/car-leasing-services", destination: "/car-leasing" },
    { url: "/categories/people-carrier-mpv", destination: "/car-leasing" },
    { url: "/categories/small-supermini", destination: "/car-leasing" },
    { url: "/short-term-car-van-rental", destination: "/van-leasing" },
    { url: "/emailsignup", destination: "/contact" },
    { url: "/how-to-find-us", destination: "/contact" },
    { url: "/fleet-management", destination: "/car-leasing-faqs" },
    { url: "/free-legal-advice", destination: "/car-leasing-faqs" },
    { url: "/fuel-cards", destination: "/car-leasing-faqs" },
    { url: "/news/20061277", destination: "/news" },
    { url: "/news/new-signs-to-help-pinpoint-location-on-motorways-523", destination: "/news" },
    { url: "/news/second-generation-vw-golf-plus-1265", destination: "/news" },
    { url: "/news/mazda-mx-5-1267", destination: "/news" },
    { url: "/news/latest-news/fleet-registrations-grow-135-in-march/www.smmt.co.uk", destination: "/news/latest-news/fleet-registrations-grow-135-in-march/4400" },
    { url: "/news/latest-news/best-small-suv-2017-lease-deals/4749", destination: "/news/blog/best-small-suv-lease-deals/4749" },
    { url: "/news/latest-news/best-estate-car-lease-deals-2018/5821", destination: "/news/blog/best-estate-car-lease-deals-2018/5821" },
    { url: "/news/latest-news/best-sports-car-lease-deals-2018/5814", destination: "/news/blog/best-sports-car-lease-deals-2018/5814" },
    { url: "/map", destination: "/sitemap" },
    { url: "/car-tax-vehicle-excise-duty-changes", destination: "/car-leasing-faqs" },
    { url: "/fully-insured-vehicle-leasing", destination: "/car-leasing-with-insurance" },
    { url: "/car-leasing-with-insurance-included", destination: "/car-leasing-with-insurance" },
    { url: "/pages/car-leasing-with-insurance", destination: "/car-leasing-with-insurance" },
    { url: "/pages/car-leasing-with-insurance-included", destination: "/car-leasing-with-insurance" },
    { url: "/pages/car-leasing-with-bad-credit", destination: "/advice/can-i-get-a-business-car-lease-with-bad-credit" },
    { url: "/car-leasing-with-bad-credit", destination: "/advice/can-i-get-a-business-car-lease-with-bad-credit" },
    { url: "/pages/car-leasing-with-maintenance", destination: "/advice/popular-topics/the-complete-guide-to-car-leasing-with-maintenance" },
    { url: "/car-leasing-with-maintenance", destination: "/advice/popular-topics/the-complete-guide-to-car-leasing-with-maintenance" },
    { url: "/pages/part-exchange-car-lease", destination: "/value-your-car" },
    { url: "/part-exchange-car-lease", destination: "/value-your-car" },
    { url: "/dealometer", destination: "/car-leasing-deals" },
    { url: "/car-special-offers", destination: "/car-leasing-deals" },
    { url: "/van-special-offers", destination: "/van-leasing-deals" },
    { url: "/advice/how-much-does-it-cost-to-lease-a-mercedez-benz", destination: "/advice/how-much-does-it-cost-to-lease-a-mercedes-benz" },
    { url: "/benefits-of-car-leasing", destination: "/advice/personal-leasing/the-benefits-of-car-leasing" },
    { url: "/news/blog/diesel-vs-petrol-which-should-you-choose-for-your-lease/5768", destination: "/advice/diesel-vs-petrol-which-should-you-choose-for-your-lease" },
    { url: "/pages/can-i-buy-my-leased-car", destination: "/advice/can-i-buy-my-leased-car" },
    { url: "/can-i-buy-my-leased-car", destination: "/advice/can-i-buy-my-leased-car" },
    { url: "/what-is-leasing", destination: "/advice/personal-leasing/what-is-car-leasing" },
    { url: "/advice/what-is-leasing", destination: "/advice/personal-leasing/what-is-car-leasing" },
    { url: "/why-lease-with-us", destination: "/our-story" },
    { url: "/gap-insurance", destination: "/look-after-my-car" },
    { url: "/obsidion-leasing", destination: "/" },
    { url: "/roads-2050", destination: "/static/roads-2050/index.html" },
    { url: "/hivis", destination: "/static/hivis/index.html" },
    { url: "/corona", destination: "/advice/leasing-options-covid-19-update" },
    { url: "/advice/10-environmentally-friendly-cars", destination: "/advice/choosing-a-car/10-environmentally-friendly-cars" },
    { url: "/advice/7-vehicles-with-the-best-car-tech", destination: "/advice/choosing-a-car/7-vehicles-with-the-best-car-tech" },
    { url: "/advice/8-differences-between-car-leasing-and-pcp", destination: "/advice/pcp-other-finance/8-differences-between-car-leasing-and-pcp" },
    { url: "/advice/business-car-leasing-tax-implications-explained", destination: "/advice/business-leasing/business-car-leasing-tax-implications-explained" },
    { url: "/advice/business-car-leasing-the-comprehensive-guide", destination: "/advice/business-leasing/business-car-leasing-the-comprehensive-guide" },
    { url: "/advice/can-i-get-a-business-car-lease-with-bad-credit", destination: "/advice/business-leasing/can-i-get-a-business-car-lease-with-bad-credit" },
    { url: "/advice/can-i-lease-a-car-for-my-new-business", destination: "/advice/business-leasing/can-i-lease-a-car-for-my-new-business" },
    { url: "/advice/can-i-lease-a-van-with-bad-credit", destination: "/advice/van-leasing/can-i-lease-a-van-with-bad-credit" },
    { url: "/advice/can-i-lease-an-insured-van", destination: "/advice/van-leasing/can-i-lease-an-insured-van" },
    { url: "/advice/car-depreciation-everything-you-need-to-know", destination: "/advice/vehicle-care/car-depreciation-everything-you-need-to-know" },
    { url: "/advice/how-long-does-it-take-to-lease-a-car", destination: "/advice/personal-leasing/how-long-does-it-take-to-lease-a-car" },
    { url: "/advice/how-much-does-it-cost-to-lease-a-car", destination: "/advice/costs/how-much-does-it-cost-to-lease-a-car" },
    { url: "/advice/how-much-does-it-cost-to-lease-a-volkswagen", destination: "/advice/best-car-for-your-budget/how-much-does-it-cost-to-lease-a-volkswagen" },
    { url: "/advice/how-to-get-a-good-deal-on-a-car-lease", destination: "/advice/costs/how-to-get-a-good-deal-on-a-car-lease" },
    { url: "/advice/is-it-better-to-lease-or-buy-a-car", destination: "/advice/personal-leasing/is-it-better-to-lease-or-buy-a-car" },
    { url: "/advice/is-there-a-road-tax-on-electric-cars", destination: "/advice/electric-leasing/is-there-a-road-tax-on-electric-cars" },
    { url: "/advice/options-for-ending-a-pcp-early", destination: "/advice/pcp-other-finance/options-for-ending-a-pcp-early" },
    { url: "/advice/the-benefits-of-business-car-leasing", destination: "/advice/business-leasing/the-benefits-of-business-car-leasing" },
    { url: "/advice/the-benefits-of-car-leasing", destination: "/advice/personal-leasing/the-benefits-of-car-leasing" },
    { url: "/advice/the-complete-guide-to-car-leasing-and-insurance", destination: "/advice/personal-leasing/the-complete-guide-to-car-leasing-and-insurance" },
    { url: "/advice/the-complete-guide-to-car-leasing-with-maintenance", destination: "/advice/popular-topics/the-complete-guide-to-car-leasing-with-maintenance" },
    { url: "/advice/the-complete-guide-to-van-leasing", destination: "/advice/van-leasing/the-complete-guide-to-van-leasing" },
    { url: "/advice/what-does-initial-rental-mean", destination: "/advice/costs/what-does-initial-rental-mean" },
    { url: "/advice/what-is-car-leasing", destination: "/advice/personal-leasing/what-is-car-leasing" },
    { url: "/advice/what-is-voluntary-termination-of-a-pcp", destination: "/advice/pcp-other-finance/what-is-voluntary-termination-of-a-pcp" },
    { url: "/advice/whats-the-best-family-car-to-lease", destination: "/advice/choosing-a-car/whats-the-best-family-car-to-lease" },
    { url: "/business/audi", destination: "/car-leasing/audi" },
    { url: "/business/bmw/5-series", destination: "/car-leasing/bmw/5-series" },
    { url: "/business/citroen/grand-c4-picasso", destination: "/car-leasing/citroen/grand-c4-picasso" },
    { url: "/business/ford/focus/focus-diesel-hatchback/20-tdci-185-st-1-5dr/1100261199/vehicle", destination: "/car-leasing/ford/focus/focus-diesel-hatchback/20-tdci-185-st-1-5dr/1100261199/vehicle" },
    { url: "/business/ford/kuga", destination: "/car-leasing/ford/kuga" },
    { url: "/business/ford/mondeo", destination: "/car-leasing/ford/mondeo" },
    { url: "/business/mazda/3", destination: "/car-leasing/mazda/3" },
    { url: "/business/mini", destination: "/car-leasing/mini" },
    { url: "/business/nissan/leaf", destination: "/car-leasing/nissan/leaf" },
    { url: "/business/nissan/qashqai", destination: "/car-leasing/nissan/qashqai" },
    { url: "/business/porsche", destination: "/car-leasing/porsche" },
    { url: "/business/seat/ibiza", destination: "/car-leasing/seat/ibiza" },
    { url: "/business/seat/leon/leon-diesel-hatchback/20-tdi-184-fr-5dr/1100231459/vehicle", destination: "/car-leasing/seat/leon/leon-diesel-hatchback/20-tdi-184-fr-5dr/1100231459/vehicle" },
    { url: "/business/skoda/octavia", destination: "/car-leasing/skoda/octavia" },
    { url: "/business/skoda/yeti", destination: "/car-leasing/skoda/yeti" },
    { url: "/business/volkswagen", destination: "/car-leasing/volkswagen" },
    { url: "/business/volkswagen/golf/golf-diesel-hatchback/20-tdi-gtd-5dr/1100230583/vehicle", destination: "/car-leasing/volkswagen/golf/golf-diesel-hatchback/20-tdi-gtd-5dr/1100230583/vehicle" },
    { url: "/business/volkswagen/polo", destination: "/car-leasing/volkswagen/polo" },
    { url: "/news/11-lean-mean-machines-for-2017/4606", destination: "/news/latest-news/11-lean-mean-machines-for-2017/4606" },
    { url: "/news/latest-news/4bn-project-to-improve-london-roads-confirmed/4371", destination: "/news" },
    { url: "/news/latest-news/cars-that-could-be-yours-for-under-250-a-month/4075", destination: "/news" },
    { url: "/news/latest-news/chancellor-confirms-fuel-duty-freeze-200m-funding-for-road-repairs/4386", destination: "/news" },
    { url: "/news/latest-news/elegance-luxury-and-that-famous-bmw-build-quality-the-3-series-from-30999-a-month/4114", destination: "/news" },
    { url: "/news/latest-news/fleet-industry-takes-25m-hit-from-flood-related-damages/4375", destination: "/news" },
    { url: "/news/latest-news/from-sweden-with-love-the-volvo-s60-saloon-from-20499-a-month/4110", destination: "/news" },
    { url: "/news/latest-news/get-some-life-back-into-your-driving-with-the-mercedes-slk-from-21781-a-month/4086", destination: "/news" },
    { url: "/news/latest-news/government-announces-140m-extra-funding-for-flood-damaged-roads/4380", destination: "/news" },
    { url: "/news/latest-news/mega-deal-alert-ford-kuga-leasing-from-16999-pm/4530", destination: "/news" },
    { url: "/news/latest-news/new-bentley-concepts-are-part-of-their-800m-development/4476", destination: "/news" },
    { url: "/news/latest-news/one-of-vauxhalls-most-desirable-models-the-astra-gtc-is-yours-from-18199-a-month/4111", destination: "/news" },
    { url: "/news/latest-news/the-ford-focus-hatchback--a-car-packed-with-features-from-just-15999-a-month/4113", destination: "/news" },
    { url: "/news/latest-newsing-engines-the-uks-most-popular-cars-of-2016/4585", destination: "/news/latest-news/searching-engines-the-uks-most-popular-cars-of-2016/4585" },
    { url: "/personal-car-leasing", destination: "/car-leasing/personal" },
    { url: "/personal/ford/s-max", destination: "/car-leasing/ford/s-max" },
    { url: "/personal/lexus", destination: "/car-leasing/lexus" },
    { url: "/van/iveco", destination: "/van-leasing/iveco" },
    { url: "/van/vauxhall", destination: "/van-leasing/vauxhall" },
    { url: "/van/volkswagen", destination: "/van-leasing/volkswagen" },
    // { url: "/car-leasing/Audi", destination: "/car-leasing/audi"},
    // { url: "/car-leasing/BMW", destination: "/car-leasing/bmw"},
    // { url: "/car-leasing/Honda", destination: "/car-leasing/honda"},
    // { url: "/car-leasing/Jaguar", destination: "/car-leasing/jaguar"},
    // { url: "/car-leasing/Kia", destination: "/car-leasing/kia"},
    // { url: "/car-leasing/Lexus", destination: "/car-leasing/lexus"},
    // { url: "/car-leasing/MINI", destination: "/car-leasing/mini"},
    // { url: "/car-leasing/SEAT", destination: "/car-leasing/seat"},
    // { url: "/car-leasing/Tesla", destination: "/car-leasing/tesla"},
    // { url: "/van-leasing/Fiat", destination: "/van-leasing/fiat"},
    // { url: "/car-leasing/alfa-romeo/Stelvio", destination: "/car-leasing/alfa-romeo/stelvio"},
    // { url: "/car-leasing/volkswagen/Touareg", destination: "/car-leasing/volkswagen/touareg"},
    // { url: "/car-leasing/alfa-romeo/Giulietta", destination: "/car-leasing/alfa-romeo/giulietta"},
    // { url: "/van-leasing/mercedes-benz/Sprinter", destination: "/van-leasing/mercedes-benz/sprinter"},
    { url: "/news/we-asked-the-nation-answered-your-countys-personalised-number-plates-revealed/4662", destination: "/news/latest-news/we-asked-the-nation-answered-your-countys-personalised-number-plates-revealed/4662" },
    { url: "/news/how-car-savvy-are-you/4550", destination: "/news/latest-news/how-car-savvy-are-you/4550" },
    { url: "/news/driving-with-pets/4580", destination: "/news/latest-news/driving-with-pets/4580" },
    { url: "/news/car-of-the-year-2017/4616", destination: "/news/latest-news/car-of-the-year-2017/4616" },
    { url: "/news/dehydrated-driving-whats-really-happening-on-britains-roads/4543", destination: "/news/latest-news/dehydrated-driving-whats-really-happening-on-britains-roads/4543" },
    { url: "/news/increased-penalties-for-driver-mobile-phone-use/4592", destination: "/news/latest-news/increased-penalties-for-driver-mobile-phone-use/4592" },
    { url: "/business/bmw/3-series/3-series-saloon/330e-sport-4dr-step-auto/1100292739/vehicle", destination: "/car-leasing/bmw" },
    { url: "/business/mercedes-benz/c-class/c-class-saloon/c350e-sport-4dr-auto/1100273407/vehicle", destination: "/car-leasing/mercedes-benz/c-class/c-class-saloon/c350e-sport-4dr-auto/1100273407/vehicle" },
    { url: "/news/clean-me-10-funny-dirty-car-from-around-the-world/4651", destination: "/news/blog/clean-me-10-funny-dirty-car-from-around-the-world/4651" },
    { url: "/news/dying-of-dehydrationwhats-really-happening-on-britains-roads/4543", destination: "/news/latest-news/dehydrated-driving-whats-really-happening-on-britains-roads/4543" },
    { url: "/personal/fiat/punto", destination: "/car-leasing/fiat" },
    { url: "/personal/kia/sportage/sportage-estate/16-gdi-isg-1-5dr/1100287783/vehicle", destination: "/car-leasing/kia/sportage/sportage-estate/16-gdi-isg-1-5dr/1100287783/vehicle" },
    { url: "/news/searching-engines-the-uks-most-popular-cars-of-2016/4585", destination: "/news/latest-news/searching-engines-the-uks-most-popular-cars-of-2016/4585" },
    { url: "/gapinsurance", destination: "/look-after-my-car" },
    { url: "/advice/how-to-get-the-best-car-for-your-budget/how-much-does-it-cost-to-lease-a-smart-car", destination: "/advice/best-car-for-your-budget/how-much-does-it-cost-to-lease-a-smart-car" },
    { url: "/advice/popular-topics/leasing-options-covid-19-update", destination: "/advice/popular-topics" },
    { url: "/advice/popular-questions", destination: "/advice/popular-topics" },
    { url: "/advice/popular-questions/car-leasing-jargon-buster", destination: "/advice/popular-topics/car-leasing-jargon-buster" },
    { url: "/advice/popular-questions/leasing-options-covid-19-update", destination: "/advice/popular-topics/car-leasing-coronavirus-covid-19-faqs" },
    { url: "/advice/leasing-options-covid-19-update", destination: "/advice/popular-topics/car-leasing-coronavirus-covid-19-faqs" },
    { url: "/advice/popular-questions/can-i-buy-my-leased-car", destination: "/advice/popular-topics/can-i-buy-my-leased-car" },
    { url: "/advice/popular-questions/car-leasing-for-young-and-new-drivers-the-complete-guide", destination: "/advice/popular-topics/car-leasing-for-young-and-new-drivers-the-complete-guide" },
    { url: "/advice/popular-questions/what-is-a-car-warranty-on-a-leased-vehicle", destination: "/advice/popular-topics/what-is-a-car-warranty-on-a-leased-vehicle" },
    { url: "/advice/popular-questions/the-complete-guide-to-car-leasing-with-maintenance", destination: "/advice/popular-topics/the-complete-guide-to-car-leasing-with-maintenance" },
    { url: "/advice/how-to-get-the-best-car-for-your-budget", destination: "/advice/best-car-for-your-budget" },
    { url: "/advice/leasing-by-manufacturer", destination: "/advice/best-car-for-your-budget" },
    { url: "/advice/leasing-by-manufacturer/how-much-does-it-cost-to-lease-a-volkswagen", destination: "/advice/best-car-for-your-budget/how-much-does-it-cost-to-lease-a-volkswagen" },
    { url: "/advice/leasing-by-manufacturer/how-much-does-it-cost-to-lease-a-vauxhall", destination: "/advice/best-car-for-your-budget/how-much-does-it-cost-to-lease-a-vauxhall" },
    { url: "/advice/leasing-by-manufacturer/how-much-does-it-cost-to-lease-a-mercedes-benz", destination: "/advice/best-car-for-your-budget/how-much-does-it-cost-to-lease-a-mercedes-benz" },
    { url: "/advice/leasing-by-manufacturer/how-much-does-it-cost-to-lease-a-kia", destination: "/advice/best-car-for-your-budget/how-much-does-it-cost-to-lease-a-kia" },
    { url: "/advice/leasing-by-manufacturer/how-much-does-it-cost-to-lease-a-hyundai", destination: "/advice/best-car-for-your-budget/how-much-does-it-cost-to-lease-a-hyundai" },
    { url: "/advice/leasing-by-manufacturer/how-much-does-it-cost-to-lease-a-ford", destination: "/advice/best-car-for-your-budget/how-much-does-it-cost-to-lease-a-ford" },
    { url: "/advice/leasing-by-manufacturer/how-much-does-it-cost-to-lease-an-audi", destination: "/advice/best-car-for-your-budget/how-much-does-it-cost-to-lease-an-audi" },
    { url: "/advice/leasing-by-manufacturer/how-much-does-it-cost-to-lease-a-land-rover", destination: "/advice/best-car-for-your-budget/how-much-does-it-cost-to-lease-a-land-rover" },
    { url: "/advice/leasing-by-manufacturer/how-much-does-it-cost-to-lease-a-fiat", destination: "/advice/best-car-for-your-budget/how-much-does-it-cost-to-lease-a-fiat" },
    { url: "/advice/leasing-by-manufacturer/how-much-does-it-cost-to-lease-a-bmw", destination: "/advice/best-car-for-your-budget/how-much-does-it-cost-to-lease-a-bmw" },
    { url: "/advice/leasing-by-manufacturer/how-much-does-it-cost-to-lease-a-porsche", destination: "/advice/best-car-for-your-budget/how-much-does-it-cost-to-lease-a-porsche" },
    { url: "/advice/leasing-by-manufacturer/how-much-does-it-cost-to-lease-a-smart-car", destination: "/advice/best-car-for-your-budget/how-much-does-it-cost-to-lease-a-smart-car" },
    { url: "/advice/leasing-by-manufacturer/how-much-does-it-cost-to-lease-a-nissan", destination: "/advice/best-car-for-your-budget/how-much-does-it-cost-to-lease-a-nissan" },
    { url: "/advice/leasing-by-manufacturer/how-much-does-it-cost-to-lease-a-tesla", destination: "/advice/best-car-for-your-budget/how-much-does-it-cost-to-lease-a-tesla" },
    { url: "/advice/leasing-by-manufacturer/how-much-does-it-cost-to-lease-a-mini", destination: "/advice/best-car-for-your-budget/how-much-does-it-cost-to-lease-a-mini" },
    { url: "/advice/leasing-by-manufacturer/how-much-does-it-cost-to-lease-a-jaguar", destination: "/advice/best-car-for-your-budget/how-much-does-it-cost-to-lease-a-jaguar" },
    { url: "/advice/vehicle-care/the-complete-guide-to-car-leasing-and-insurance", destination: "/advice/personal-leasing/the-complete-guide-to-car-leasing-and-insurance" },
    { url: "/news/latest-news/%e2%80%98dieselgate-a-historic-case-sets-precedent-for-uk-motorists/7287", destination: "/news/latest-news/dieselgate-a-historic-case-sets-precedent-for-uk-motorists/7287" },
    { url: "/car-leasing/alfa-romeo/4c", destination: "/car-leasing/alfa-romeo" },
    { url: "/car-leasing/skoda/yeti", destination: "/car-leasing/skoda" },
    { url: "/van-leasing/fiat/fullback", destination: "/van-leasing/fiat" },
    { url: "/car-leasing/abarth/124-spider", destination: "/car-leasing/abarth" },
    { url: "/car-leasing/fiat/124-spider", destination: "/car-leasing/fiat" },
    { url: "/advice/compare-cars/porsche-macan-vs-cayenne-%7c-compare-cars-%7c-leasing-options", destination: "/advice/compare-cars/porsche-macan-vs-cayenne-which-is-better" },
    { url: "/advice/choosing-a-car/diesel-vs-petrol-which-should-you-choose-for-your-lease", destination: "/advice/choosing-a-car/choosing-between-diesel-and-petrol" }, ,
    { url: "/advice/choosing-between-diesel-and-petrol", destination: "/advice/choosing-a-car/choosing-between-diesel-and-petrol" },
    { url: "/electric-car-types", destination: "/electric-hybrid-car-leasing/types" },
    { url: "/electric-car-charging", destination: "/electric-hybrid-car-leasing/charging" },
    { url: "/government-grants", destination: "/electric-hybrid-car-leasing/government-grants" },
];

const tempPageRedirects = [
    { url: "/car-leasing/bmw/5-series/5-series-diesel-saloon/520d-m-sport-4dr-auto/1100309915/vehicle", destination: "/car-leasing/bmw/" },
    { url: "/car-leasing/personal", destination: "/car-leasing" },
    { url: "/van-leasing/iveco", destination: "/van-leasing" },
    { url: "/van-leasing/ldv", destination: "/van-leasing" },
    { url: "/news/blog/how-much-does-it-cost-to-lease-an-audi/6035", destination: "/news" },
]

app.prepare().then(() => {

    const server = express()

    tempPageRedirects.forEach(page => {
        server.get(page.url, (req, res) => {
            res.redirect(302, page.destination)
        })
    });

    pagesArray.forEach(page => {
        server.get(page.url, (req, res) => {
            res.redirect(301, page.destination)
        })
    });

    server.use("/internal", async function (request, response, next) {
        let ip = request.headers["cf-connecting-ip"] || request.headers["x-forwarded-for"] || request.client.remoteAddress;

        if (ip && ip.includes(".") && ip.includes(":")) {
            ip = ip.split(':')[0];
        }

        const authResponse = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_AUTH_URL + "api/authentication/isinternal", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'LO-ORIGINAL-IP': ip,
                'LO-ORIGINAL-USERAGENT': request.headers["user-agent"]
            }
        });
        const data = await authResponse.json();

        if (authResponse.ok && data.data) {
            next();
        }
        else {
            response.sendStatus(403);
        }
    });

    server.all('*', (req, res) => {
        let url = req.url.toLowerCase();
        let permanentRedirectRequired = false;

        if (!url.includes("woff2") && !url.includes("ttf") && !url.includes("js") && !url.includes("css") && !url.includes("/api") && !url.includes("filemanager")) {
            //Any requests with . aspx need to be permamnet redirect to MVC styled route
            //Otherwise search engines will just throw the footprint away instead of updating it + it helps users with old bookmarks too
            if (url.includes(".aspx")) {
                url = url.replace(".aspx", "");
                permanentRedirectRequired = true;
            }

            if (url.includes("car-leasing/budget-over-") || url.includes("van-leasing/budget-over-")) {
                url = url.replace("budget-over-", "budget-over/");
                permanentRedirectRequired = true;
            } else if (!url.includes("car-leasing/budget-over") && url.includes("car-leasing/budget-") || !url.includes("van-leasing/budget-over") && url.includes("van-leasing/budget-")) {
                url = url.replace("budget-", "budget/");
                permanentRedirectRequired = true;
            }

            if (url.includes("car-leasing/body-type-") || url.includes("van-leasing/body-type-")) {
                url = url.replace("body-type-", "body-type/");
                permanentRedirectRequired = true;
            }

            //Epiphany: Redirect some old mobile urls
            if (url.includes("/m/") || url.includes("/mobile/")) {
                url = url.replace("/m/", "/").replace("/mobile/", "/");
                permanentRedirectRequired = true;
            }

            if (url.includes("/vehicle-personalise")) {
                url = url.replace("/vehicle-personalise", "/vehicle");
                permanentRedirectRequired = true;
            }

            if (url.includes("/default") && !url.includes("/cms/default")) {
                url = url.replace("/default", "/");
                permanentRedirectRequired = true;
            }

            if (url.includes("/advice/tag-")) {
                url = "/advice"
                permanentRedirectRequired = true;
            }

            // Causes infinite redirect loop if uncommented
            //  if (url.includes(""))
            //  {
            //      while (url.includes(""))
            //      {
            //          url = url.replace("", "/");
            //      }
            //      permanentRedirectRequired = true;
            //  }

            // DO NOT APPLY THIS TO DEFAULT "/" Route AS IT WILL CAUSE REDIRECT LOOP
            // Epiphany: Redirect any urls ending with '/' to url without '/'
            if (url.endsWith("/") && url != "/" && url != "/cms/") {
                url = url.substring(0, url.length - 1);;
                permanentRedirectRequired = true;
            }
        }

        if (permanentRedirectRequired) {
            res.redirect(301, url);
        } else {
            return handle(req, res)
        }
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http:localhost:${port}`)
    })
})