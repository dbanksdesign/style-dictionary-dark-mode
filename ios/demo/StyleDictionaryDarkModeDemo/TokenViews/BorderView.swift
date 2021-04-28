//
//  BorderView.swift
//  StyleDictionaryDarkModeDemo
//
//  Created by Banks, Daniel on 4/6/21.
//  Copyright © 2021 Amazon. All rights reserved.
//

import Foundation
import SwiftUI
import StyleDictionaryDarkMode

struct BorderRow: View {
    var label: String
    var color: Color
    
    var body: some View {
        ZStack {
            HStack {
                VStack(alignment: .leading) {
                    Text(label)
                }.padding(Size.paddingMedium)
                Spacer()
            }
            .border(color, width:Size.borderWidthLarge)
        }
        .padding(.top, Size.paddingMedium)
        .padding(.leading, Size.paddingMedium)
        .padding(.trailing, Size.paddingMedium)
    }
}

struct BorderView: View {
    var body: some View {
        ZStack {
            ScrollView {
                VStack {
                    // SwiftUI has a maximum of 10 children...
                    Group {
                        BorderRow(label:"Primary", color:Color.borderPrimary)
                        BorderRow(label:"Secondary", color:Color.borderSecondary)
                        BorderRow(label:"Tertiary", color:Color.borderTertiary)
                    }
                    Group {
                        BorderRow(label:"Interactive", color:Color.borderInteractive)
                        BorderRow(label:"Hover", color:Color.borderHover)
                        BorderRow(label:"Active", color:Color.borderActive)
                        BorderRow(label:"Disabled", color:Color.borderDisabled)
                    }
                    Group {
                        BorderRow(label:"Danger", color:Color.borderDanger)
                        BorderRow(label:"Warning", color:Color.borderWarning)
                        BorderRow(label:"Success", color:Color.borderSuccess)
                        BorderRow(label:"Info", color:Color.borderInfo)
                    }
                    
                }
            }
        }
        .navigationBarTitle("Border Colors")
        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        .background(Color.backgroundPrimary)
//        .edgesIgnoringSafeArea(.all)
    }
}

struct BorderView_Previews: PreviewProvider {
    static var previews: some View {
        BorderView()
    }
}

