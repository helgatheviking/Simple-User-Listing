import {Component} from '@wordpress/element';

import SearchForm from "./components/SearchForm";
import User from "./components/User";

class Edit extends Component {
	render() {
		return (
			// use apiGet to get a valid list of users
			// loop through the users and render the User Component per user

			<div className="user-list-content">

				<SearchForm />

				<div className="user-list-wrap">

					<User />

					<div id="user-9" className="author-block">

						<img alt=""
							 src="http://2.gravatar.com/avatar/5ea2f87f9050163853c406cb54b1b0e7?s=90&amp;d=mm&amp;r=g"
							 srcSet="http://2.gravatar.com/avatar/5ea2f87f9050163853c406cb54b1b0e7?s=180&amp;d=mm&amp;r=g 2x"
							 className="avatar avatar-90 photo" loading="lazy" width="90" height="90" /><h2>Aidan</h2>
							<p>Necessitatibus nisi accusamus assumenda qui magni alias. Itaque unde impedit numquam et.
								Praesentium quis corrupti aut consequatur dolorem consequatur. Qui illum dolorum culpa
								asperiores quia debitis velit.

								Doloremque ut non ut totam. Perspiciatis id reiciendis at maiores ut. Illum omnis eos ea
								distinctio rerum quia ut omnis.</p>
					</div>
					<div id="user-2" className="author-block">

						<img alt=""
							 src="http://0.gravatar.com/avatar/cd25de8fdd0a9b4e31436c0eb0ea8af6?s=90&amp;d=mm&amp;r=g"
							 srcSet="http://0.gravatar.com/avatar/cd25de8fdd0a9b4e31436c0eb0ea8af6?s=180&amp;d=mm&amp;r=g 2x"
							 className="avatar avatar-90 photo" loading="lazy" width="90" height="90" /><h2>Estrella</h2>
							<p>Aperiam dolores repellat at. Aut doloremque molestias sint maiores quae. Consectetur aut
								non consequatur nobis qui autem esse.

								Molestiae doloribus et est beatae. Pariatur eaque repellat consectetur dolor fugit
								nesciunt. Consectetur qui necessitatibus modi quam hic corporis quos est.</p>
					</div>
					<div id="user-4" className="author-block">

						<img alt=""
							 src="http://1.gravatar.com/avatar/490cf38071709f7e200257f9f1593f91?s=90&amp;d=mm&amp;r=g"
							 srcSet="http://1.gravatar.com/avatar/490cf38071709f7e200257f9f1593f91?s=180&amp;d=mm&amp;r=g 2x"
							 className="avatar avatar-90 photo" loading="lazy" width="90" height="90" /><h2>Zaria</h2>
							<p>Esse dolorum officiis voluptatem. Sint quidem atque dolore nesciunt nemo. Sit at fugiat
								qui voluptatum. Pariatur ut et perspiciatis quod quia ut corrupti.

								Earum fugiat quaerat qui. Accusantium ea deleniti sunt similique quia hic nam. Unde
								optio explicabo sequi commodi ea.</p>
					</div>
					<div id="user-7" className="author-block">

						<img alt=""
							 src="http://2.gravatar.com/avatar/e0201ec685afdcb08138091b788bc1fc?s=90&amp;d=mm&amp;r=g"
							 srcSet="http://2.gravatar.com/avatar/e0201ec685afdcb08138091b788bc1fc?s=180&amp;d=mm&amp;r=g 2x"
							 className="avatar avatar-90 photo" loading="lazy" width="90" height="90" /><h2>Magdalen</h2>
							<p>Et quo natus quam labore vel voluptas quas totam. Vel ipsa laborum blanditiis ab placeat
								veritatis rerum.

								Id qui qui adipisci hic facilis adipisci. Est expedita mollitia qui molestias. Porro
								quia qui quo placeat quos eum error. In minima est et autem nihil amet.</p>
					</div>
					<div id="user-18" className="author-block">

						<img alt=""
							 src="http://1.gravatar.com/avatar/aa283b7f09c25028bb71215aa1e2206c?s=90&amp;d=mm&amp;r=g"
							 srcSet="http://1.gravatar.com/avatar/aa283b7f09c25028bb71215aa1e2206c?s=180&amp;d=mm&amp;r=g 2x"
							 className="avatar avatar-90 photo" loading="lazy" width="90" height="90" /><h2>Carmel</h2>
							<p>Soluta culpa non sequi fugiat est. Inventore numquam tempora et deserunt nisi
								suscipit.</p>
					</div>
					<div id="user-5" className="author-block">

						<img alt=""
							 src="http://2.gravatar.com/avatar/200af6edaa4157af96cb4a0596ed5394?s=90&amp;d=mm&amp;r=g"
							 srcSet="http://2.gravatar.com/avatar/200af6edaa4157af96cb4a0596ed5394?s=180&amp;d=mm&amp;r=g 2x"
							 className="avatar avatar-90 photo" loading="lazy" width="90" height="90" /><h2>Kennith</h2>
							<p>Veritatis libero esse earum et sed repudiandae. Fugiat nemo voluptas beatae. Ullam sunt
								eius ut sint sequi autem et dolorum. Natus voluptatem recusandae qui ut.</p>
					</div>
					<div id="user-16" className="author-block">

						<img alt=""
							 src="http://0.gravatar.com/avatar/3414735279ad88cbb86716ea38e8a533?s=90&amp;d=mm&amp;r=g"
							 srcSet="http://0.gravatar.com/avatar/3414735279ad88cbb86716ea38e8a533?s=180&amp;d=mm&amp;r=g 2x"
							 className="avatar avatar-90 photo" loading="lazy" width="90" height="90" /><h2>Osvaldo</h2>
							<p>Voluptas quia quo qui eos itaque soluta eos aspernatur. Fuga quia vero ducimus numquam
								nihil. Necessitatibus eos est laudantium voluptatum enim non maiores. Totam et aperiam
								vel corrupti et beatae.

								Optio ex ipsum fuga dolores qui earum. Sed rerum qui fugit veritatis. Autem et eum ut
								et.

								Vero quis eaque sequi ut corporis accusantium omnis. Et repellendus ipsam saepe.
								Assumenda tenetur quis autem non. Voluptatem molestiae ipsum amet non porro.</p>
					</div>
					<div id="user-13" className="author-block">

						<img alt=""
							 src="http://0.gravatar.com/avatar/6200ca2ba3d290e2c35f1bb347450679?s=90&amp;d=mm&amp;r=g"
							 srcSet="http://0.gravatar.com/avatar/6200ca2ba3d290e2c35f1bb347450679?s=180&amp;d=mm&amp;r=g 2x"
							 className="avatar avatar-90 photo" loading="lazy" width="90" height="90" /><h2>Merl</h2>
							<p>Omnis dolor sed iusto dolor facilis tempore. Id occaecati quasi est eum eveniet pariatur
								consequatur. Voluptatibus ipsum omnis dolorum voluptatem sapiente rem. Esse et qui
								doloribus laboriosam quae cumque cumque fugiat.

								Ipsam commodi consequatur fugit non totam qui. Facere itaque esse minima nisi. Quae quis
								officia doloribus est aut voluptate. Et maiores natus praesentium soluta aut aut. Et
								praesentium aut eos dolores eveniet et ut.

								Quasi perspiciatis at asperiores consequatur. Iste culpa ullam dolorum distinctio rerum
								omnis. Iste id et et voluptas quis autem est.

								Voluptas est facilis ut animi velit. Expedita odit ducimus debitis qui aut ut ea non. Et
								libero cupiditate ex eveniet eveniet et. Reprehenderit aperiam facilis et quia.</p>
					</div>
					<div id="user-3" className="author-block">

						<img alt=""
							 src="http://1.gravatar.com/avatar/ad968579215da9ba60c04423f96f3eff?s=90&amp;d=mm&amp;r=g"
							 srcSet="http://1.gravatar.com/avatar/ad968579215da9ba60c04423f96f3eff?s=180&amp;d=mm&amp;r=g 2x"
							 className="avatar avatar-90 photo" loading="lazy" width="90" height="90" /><h2>Darlene</h2>
							<p>Maxime rerum deserunt tenetur. Debitis ea minus culpa hic dignissimos. Tenetur sit nihil
								quo earum aut mollitia commodi.

								Tempora repellendus at ducimus omnis. Ut voluptas delectus incidunt dicta. Adipisci
								omnis quaerat occaecati fugiat quaerat quos.

								Qui nemo itaque maxime eum esse. Et qui sunt a facere quis quaerat nam. Pariatur sed sed
								sit labore fugiat.</p>
					</div>
				</div>

				<nav id="nav-single">

					<h3 className="assistive-text">User navigation</h3>


					<span className="nav-next"><a rel="next"
												  href="http://wordpress.test/page/2/?p=153&amp;preview=true">Next <span
						className="meta-nav">→</span></a></span>

				</nav>

			</div>
		);
	}
}

export default Edit;
