#include <eosio/eosio.hpp>
#include <vector>

using namespace eosio;
using namespace std;



class [[eosio::contract("commant")]] commant : public eosio::contract {
	public:

		commant(name receiver, name code, datastream<const char*> ds): contract(receiver, code, ds) {}

		[[eosio::action]]
		void write(name account, uint64_t t,string user, string searchkeyword,string clickkeyword, string url, uint64_t up) {
            require_auth(account);
            notice_repository notice_repos(get_self(),get_first_receiver().value);
            
			notice_repos.emplace(account, [&](auto& notice) {
			    notice.account = account;
			    notice.t = t;
				notice.user = user;
				notice.searchkeyword = searchkeyword;
				notice.clickkeyword = clickkeyword;
				notice.url = url;
				notice.up = up;
			});
		}
		[[eosio::action]]
        void clear(name user) {
            require_auth(user);

            notice_repository notice_repos(get_self(),get_first_receiver().value);

            auto iterator = notice_repos.find(user.value);
            check(iterator != notice_repos.end(), "Record does not exist");
            notice_repos.erase(iterator);
        }
		
	private:
		struct [[eosio::table]] notice {
		    name account;
		    uint64_t t;
			string user;
			string searchkeyword;
			string clickkeyword;
			string url;
			uint64_t up;

			uint64_t primary_key() const { return t; }
			EOSLIB_SERIALIZE(notice, (account)(t)(user)(searchkeyword)(clickkeyword)(url)(up))
		};


		typedef eosio::multi_index<"notices"_n, notice> notice_repository;
};

