class Utils
	class << self
		def render_json(object, status)
			{
				json:  object,
				status:  status,
				root: false
		    }
		end

		def check_missing_fields(params, fields, parent_prm_name)
			binding.pry
			missing_fields = []
			fields.each do |field|
				missing_fields << field unless params[parent_prm_name][field].present?
			end
			missing_fields
		end

		def common_prefix(list)
			list.map { |line| line.to_s.strip }.sort_by { |str| str.length }

			prefix = list.first.dup

			until prefix.empty? or list.all? { |str| str =~ /^#{prefix}/ }
				prefix.chop!
			end

			prefix
		end

		def related_type(type_value)
			return "integer" if type_value == "sequance_number"
			return "string" if type_value == "list"
			return "string" if type_value == "image"
			return type_value
		end

		def version_finder(file_name)
			files = Dir.glob("db/migrate/*_#{file_name}.rb")
			files = files.collect { |f| f.split("/").last.split("_").first }
			files.first
		end

		def export_to_csv(objects, header, attributes)

			csv_config = {
			              col_sep: ",", 
			              row_sep: "\n", 
			              encoding: 'ISO-8859-1'
			             }
			CSV.generate(csv_config) do |csv|
				csv << header

				objects.each do |object|
					csv << attributes.map{ |attribute| object.send(attribute) }
				end
		    end
		end
	end
end