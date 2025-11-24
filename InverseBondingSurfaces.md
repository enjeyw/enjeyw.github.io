As an alternative to existing crowdsourced content-curation methods, such as "Likes" on Twitter, we propose a curatorial model that uses a market mechanism to incentivise the identification of high-quality content from unexpected places. In this model, instead of simply 'Liking' content, curators purchase tokens that signify support of that content. Curators who identify as-of-yet  undiscovered high quality content are able to purchase tokens at a lower price, and subsequently sell them for a profit. As such, the price of the 'Support' token, fluctuating according to demand, becomes a measure of how popular a piece of content is.

Support Tokens are endogenously priced rather than being tied to concrete outcomes, which makes them vulnerable to price-manipulation. To combat this, we introduce the Coupled Bonding Surface (CBS), a new market making algorithm that is more resistant to price-manipulation than traditional token issuance algorithms. Using the CBS, an 'Opposition' token is issued alongside the 'Support' token. The price of the Support and Opposition tokens are algorithmically coupled, such that purchasing Opposition tokens drives the price of Support tokens down and vice-versa. This makes it far more risky to artificially inflate the price of a Support token, improving curatorial quality.

# Introduction

### Curation is critical to Aggregation  Theory

One of the most important business trends of the 21st Century has been the Cambrian Explosion of platforms like AirBnB, Netflix and Twitter. These platforms have far more in common than just being reliant on the internet; their value proposition centres on aggregating previously fractured collections of content or services, and providing these directly to the user. Netflix aggregates movies, AirBnB aggregates accomodation, and Twitter, ideas. Aggregation Theory - the framework developed to describe this trend, has far-reaching implications for a wide range of technology companies, from Apple to Zomato.

What is understated in most discussions about Aggregation Theory however, is the central role that curation plays. Making a collection of services available in one place increases access, but users can be left overwhelmed if they aren’t provided with a way of choosing between these services. Getting into a stranger’s car without some idea of their trustworthiness is unthinkable for most people. Curation is so important that for some aggregation platforms, it’s more of a critical value proposition than accessibility; people don’t use Skyscanner because it’s the easiest way to book flights, but because it helps them find the best value flights for their trip.

The need for content and service curation is not new to Aggregation Platforms. For years we’ve relied on traditional media publications to provide us with quality assessments of movies, hotels, restaurants, political policies and ideas in general. What has changed is the scale at which we require these curatorial inputs. Aggregator platforms inherently have enormous volume, meaning it’s no longer viable to rely on a small handful of curators; it is clearly not a reasonable proposition to have every Tweet assessed by an editorial team for quality. And nor should we want it to be. Traditional curatorial models not only scale poorly, they’re also prone to amplifying biases; curatorial teams almost invariably grow by selecting new members from within their in-group, meaning that individual biases rapidly become collective biases.

### Crowdsourced Curation Introduces Feedback Loops

Aggregation Platforms have popularised a different form of curation, one based on crowdsourcing. The specifics of how this is implemented varies. For some platforms like Reddit, it’s explicit and transparent - Upvotes are translated into content ranking via a known algorithm. For other platforms like Spotify, an implicit black-box process is used; play counts are used to estimate song approval, which is fed through a complex Collaborative Filtering algorithm to predict which songs will appeal to the same listeners. In all cases, the fundamental idea is the same; all content consumers can be leveraged provide curatorial input based on their own experience, which in turn informs the consumption of others.

Because crowdsourcing processes scale with the number of consumer-curators, the benefits of having more supply on a platform can be leveraged to their fullest extent, and rather than being amplified, individual biases are smoothed out. At least in theory; the reality is somewhat different. By design, content that is yet to be curated should be of lower quality - you’re for more likely to get a bad meal from an unknown restaurant, than one with consistently good reviews. For traditional curators, this is fine - they’re paid to review unknown services. However, existing crowdsourcing methods do not reward curation efforts. This means a consumer-curator trying to optimise for their personal enjoyment doesn’t have a lot of motivation to take a risk on an unknown quantity. "Being the first to try X" is not great compensation for a bad meal! As a consequence the overwhelming majority of consume-curators take a path of least resistance, and select content or services that have already been curated to some extent by others, for example, by following already-popular Twitter handles. This leads to a lot of high-quality content remaining undiscovered, simply because there’s too few willing to try them in lieu of a a relatively certain bet, while content that that has gained some level of popularity enters a powerful feedback loop, attracting consumers who proceed to rate it favourably, further boosting its appeal.

For social media platforms such as Twitter and Reddit, this has serious implications. Ideas that meet some critical threshold become significantly amplified, while ideas that fall just short are suppressed into invisibility. This results a distortion in the perceived relative popularity of ideas, and in perverse incentives to create content that is populist, inflammatory and more likely to meet the critical threshold required to enter the feedback loop, rather than thoughtful and balanced content. If we wish to have reasonable discussion on internet-based platforms without acquiescing to purely algorithmic methods of ranking ideas, we need a way to incentivise consumer-curators to search through a diverse range of material, in order to locate as-of-yet unidentified high quality content.

# **Market-Based Curation**

We propose the use of a a market-based mechanism to incentivise curators to put effort towards identifying as-of-yet undiscovered high content. In such a mechanism, instead of simply 'Liking' content, curators purchase tokens that signify support of that content. There is no fixed supply of 'Support' Tokens. Rather, each token is issued at an algorithmically determined price using a "bonding curve" model; the more tokens in circulation, the higher their purchase price is. This means curators who are able to identify good quality content early are able to purchase tokens at a lower price. Such curators are then able to subsequently sell their tokens at the current market price, thereby making a profit from their insight, and equally driving the price back down. As such, the price of the 'Support' token, fluctuating according to demand, becomes a measure of how popular a piece of content is.

Effectively, this process leverages Efficient Market Hypothesis (EMH) - the theory that all stocks trade close to their fair market price. The justification for EMH is that when a mis-priced stock is identified, investors are motivated to purchase or sell shares in this stock, causing it to rapidly approach appropriate pricing. While the extent to which EMH is valid is contested, the fact it exists to any degree is nonetheless an incredibly powerful tool for a generalised curation model, as it suggests a depth of content curation far beyond what is achieved with existing methods.

However, while a market price can always be considered to be an EMH-accurate valuation of something, this valuation is not guaranteed to actually be meaningful. The extent to which it is is entirely dependent on how effectively we are able to enforce a common understanding among market participants of what exactly that the price is supposed to track - the Schelling Point. In many traditional markets the Schelling Point is relatively easy to enforce because the market can be settled against something concrete. Prediction markets accurately track probabilities because they pay out based on an actual event, while commodity markets are tied to owning some underlying asset with intrinsic utility.

In contrast, curation markets do not have an enforceable Schelling Point - there is no direct utility derived from owning Support tokens. Rather the market is entirely endogenously priced, and we must rely on market participants all agreeing that Support tokens are tied to the perceived quality of a piece of content. There is no way to prevent market participants from collectively agreeing that the Support Tokens for a piece of content should track the price of something completely irrelevant to the content. This may seem unusual, but in many ways it’s very similar to how share pricing behaves in cases where there is no dividend. In such case there’s low intrinsic value to owning the shares. Rather, participants buy and sell shares purely on the grounds that they foresee a change in market sentiment that is yet to be reflected in market prices.

This process is generally robust because there’s very common knowledge that the Schelling Point for any company’s stock is tied to that company’s expected performance. Overriding this requires a highly coordinated effort, as in lieu of any other motivating factor, a market participant will adopt the “Expected Perfomance” Schelling point based on their understanding of the common knowledge. With sufficiently coordinated effort, manipulating a stock’s Schelling Point is least temporarily is possibles. This potential has been made particularly evident in recent months, with Hertz’s rapid rise in share price despite the declaration of Bankruptcy being a notable example.

Curation markets are vulnerable to the same Schelling Point manipulation attacks. Indeed given the price signal from a curation token is specifically leveraged to identify content, content creators have a particular motivation to manipulate the price of tokens linked to their own content.

This exposes a critical flaw in using a standard bonding curve for curating content; the price of a support token can be manipulated by a content creator to artificially make their content more popular, without the creator incurring any cost for doing so.

By purchasing a large number of tokens as soon as a market is created, a creator can increase the token price from $P_0$ to $P_1$. As the creator is the first participant in the market, the token price cannot drop below $P_0$ without the creator selling their tokens. This means the creator, having artificially inflated the price for a desired period, can sell their tokens at any point and recoup all of their initial investment. 

### M**anipulation Resistance Via Coupled Bonding Surfaces**

It is possible to make curation markets more resistant to manipulation by turning to a tool used to make traditional markets more accurately priced: short-selling. When markets lack an effective shorting mechanism, downwards price pressure can only come from traders who decide sell tokens they’ve previously purchased. 

In contrast, if participants are able to go short on a market at any time, it allows anyone to express negative sentiment in a particular market without having previously having participated in it. This fundamentally modifies the risk-equation for participants trying to pump a market its early stages, as the minimum price can now drop below the market's starting price.

Standard Bonding Curves do not natively support short selling. To introduce this capacity, a secondary token that signifies opposition to the content  is also made available to purchase. The price of the 'Support' and 'Opposition' tokens are algorithmically coupled, such that purchasing Opposition tokens drives down the price of Support tokens, and vice-versa. In essence, the token issuance algorithm has been extended from a Bonding Curve into an Inverse Coupled Bonding Surface (CBS). The consequence of the Inverse CBS is that that the initial listing price of the 'Support' token is no longer its lowest possible price, meaning it is no longer possible to inflate its price without incurring risk exposure. The 'Opposition' token has the secondary advantage of allowing a direct comparison of the support and opposition to a particular idea. 

## Constructing an Inverse **CBS**

 To construct an Inverse CBS, we will use a Cost Function $C(s_1,s_2)$, which states that the total amount of funds paid to the contract in exchange for tokens  $T_1$ and  $T_2$ (representing Support and Opposition tokens respectively) is a function of only their current supplies $s_1$ and $s_2$.Thus the cost to purchase $\Delta s_1$ of $T_1$ and $\Delta s_2$ of $T_2$ is:

$$
\Delta C = C(s_1 + \Delta s_1, s_2 + \Delta s_2) - C(s_1,s_2)
$$

The Cost Function that defines our inversely couple bonding surface is then given by:

$$
C(s_1,s_2)=( {s_1^{ \frac{F_1}{ \beta}}} + {s_2^{ \frac{F_2}{ \beta }}})^{\beta}
$$

Here $F_i$ is analogous to the Reserve Ratio for each token, and determines the rate at which token price grows with respect to supply, and $\beta$ is the coupling coefficient between the two tokens. Token prices are negatively correlated when $0<\beta<1$, independent when $\beta=1$, and positively correlated when $\beta>1$. To further understand the behaviour of the Cost Function, let us choose sensible parameter values, such as $\beta=\frac{1}{2}$ and $F_1=F_2=3$. Then:

$$
C(s_1,s_2)=(s_1^{6}+s_2^{6})^{\frac{1}{2}}
$$

The price of a token is given by the partial derivative of its supply with respect to $C$, so for $T_1$:

$$
p_1 = \frac{\partial C}{\partial s_1}=3 \frac{s_1^5}{(s_1^{6}+s_2^{6})^{\frac{1}{2}}}
$$

We can now see that $p_1$ monotonically increases with respect to $s_1$, approaching $p_1=3s_1^2$ for $s_1>>s_2$. More critically, we can see that $p_1$ monotonically decreases with respect to $s_2$. Given the Cost Function is symmetric, the same logic applies to $p_1$. *That is, as more of  $T_1$ is issued, its price increases, and the price of  $T_2$ decreases.*

A plot of $p_1$ for is provided below for visualisation purposes. A plane has been inserted at
$s_1=0.2$ to make it easier to see the price drop with respect to $p_2$.

![](BondingSurfacePriceFunction.png)

The choice of $F_1=F_2=3$ illustrates some other desirable properties of the Inverse CBS, namely its convexity. If instead we choose $F_1=F_2=1$, then the CBS becomes

$$
C(s_1,s_2)=(s_1^{2}+s_2^{2})^{\frac{1}{2}}
$$

This in turn implies:

$$
p_1 = \frac{s_1}{(s_1^{2}+s_2^{2})^{\frac{1}{2}}}
$$

In this case, token prices are bounded above; no matter how much of $T_1$ is issued, its price $p_1$will no increase above 1. This is very similar to the LMSR used in prediction markets

While we are most interested in Coupled Bonding Curves with Two assets, the concept generalises to any number of assets (here an extra weighting term is included):

$$
C(s_1,…,s_n)=\left(\sum_{i=1}^{n} (\frac{s_i}{W_i})^{\frac{F_i}{\beta}}\right)^{\beta}
$$

## Possible Issues with Inverse CBS Curation

**Plutocracy**

Like all curation methods that involve commitment of funds, those with more capital available have some capacity to exert more influence. I believe the market-mechanism addresses this to some extent, as depositing a large amount of funds to move a token to a vastly different price risks having another set of traders come in and move the price back, at your expense; the Efficient Market Hypothesis in action. However, this resilience is predicated on the market having sufficient depth and diversity of traders.

**Schelling Point Corruption**

For the curation process to be effective, the Market needs to have a strong Schelling Point tying token prices to the perceived quality of the associated quality.

it’s very common for Schelling Points to end up effectively measuring hype around an idea rather than the idea’s actual quality (see most of the ICO market). However I’m uncertain of the extent to which a Schelling Point that reflects hype rather than quality per-se would actually be problematic, as I suspect there’s a strong correlation between hype and quality in many cases, especially when the market is natively short-able. Of course, Schelling Points can shift entirely to market-endogenous speculation, as seen with Hertz’s recent stock price, though the Hertz case appears to have been caused by dark-pool trading and a lack of primary market liquidity, which is not a concern with a bonding curve.
